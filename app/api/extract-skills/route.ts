import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 })
    }

    const prompt = `
You are an expert technical recruiter and resume parser.
Extract ONLY the technical skills (programming languages, frameworks, databases, cloud providers, tools, concepts) from the following resume text.

Return ONLY a valid JSON array of strings representing the skills. Do not include markdown formatting like \`\`\`json. Example: ["React", "TypeScript", "Node.js"]

Resume text:
${text}
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
            temperature: 0.1, // Low temperature for factual extraction
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Parse Gemini's response text which should be a JSON array
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]"
    
    // Clean up potential markdown blocks if Gemini ignored the instruction
    const cleanText = rawText.replace(/```json\n?|\n?```/g, '').trim()
    
    let skills: string[] = []
    try {
      skills = JSON.parse(cleanText)
      // Ensure it is an array
      if (!Array.isArray(skills)) {
        // Fallback: perhaps it returned an object
        if (typeof skills === 'object' && skills !== null) {
          skills = Object.values(skills).flat() as string[]
        } else {
          skills = []
        }
      }
    } catch (e) {
      console.error("Failed to parse Gemini output as JSON:", cleanText)
      skills = []
    }

    // Limit to reasonable amount of core skills to keep UI clean
    return NextResponse.json({ skills: skills.slice(0, 20) })
    
  } catch (error: any) {
    console.error("API Error in extract-skills:", error)
    return NextResponse.json({ error: "Failed to extract skills", details: error.message }, { status: 500 })
  }
}
