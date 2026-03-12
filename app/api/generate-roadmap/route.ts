import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { skills, targetRole, missingSkills } = await req.json()

    if (!targetRole || !missingSkills || !Array.isArray(missingSkills)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const prompt = `
You are an expert technical career coach.
A user wants to become a "${targetRole}".
They already know: ${skills?.join(", ") || "Nothing yet"}.
They need to learn these missing skills: ${missingSkills.join(", ")}.

Create a highly structured 4-6 week learning roadmap to help them acquire these missing skills.
Return ONLY a valid JSON array of objects representing the weeks. Do not include markdown blocks like \`\`\`json.

Format EXACTLY like this:
[
  {
    "week": "Week 1",
    "focus": "Core Fundamentals of X",
    "tasks": ["Study concept A", "Build small project B"]
  },
  {
    "week": "Week 2",
    "focus": "Advanced Y",
    "tasks": ["Read documentation on Y", "Implement Y in a project"]
  }
]
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3, // A bit of creativity for varied roadmaps
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Parse Gemini's response text
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]"
    
    // Clean up potential markdown blocks
    const cleanText = rawText.replace(/```json\n?|\n?```/g, '').trim()
    
    let roadmap = []
    try {
      roadmap = JSON.parse(cleanText)
      if (!Array.isArray(roadmap)) roadmap = []
    } catch (e) {
      console.error("Failed to parse Gemini roadmap output as JSON:", cleanText)
      roadmap = []
    }

    return NextResponse.json({ roadmap })
    
  } catch (error) {
    console.error("API Error in generate-roadmap:", error)
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 })
  }
}
