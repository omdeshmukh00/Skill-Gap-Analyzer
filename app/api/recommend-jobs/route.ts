import { NextResponse } from 'next/server'
import { jobRoles } from '@/lib/jobRoles'

export async function POST(req: Request) {
  try {
    const { skills, targetRole } = await req.json()

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json({ error: "Missing or invalid skills array" }, { status: 400 })
    }

    // Optional: We can pass the required skills for the target role to give Gemini context
    // if targetRole is provided. 
    let contextAddition = ""
    if (targetRole && jobRoles[targetRole]) {
      contextAddition = `
The user is specifically targeting the role of "${targetRole}". 
For context, a typical ${targetRole} should know: ${jobRoles[targetRole].join(", ")}.
Make sure to include "${targetRole}" as one of the recommended jobs, comparing their current skills to the required ones.
`
    }

    const prompt = `
You are an expert tech career advisor AI.

The user currently has these skills: ${skills.join(", ")}
${contextAddition}

Evaluate their profile and suggest the best matching tech job roles. Calculate a realistic match percentage (0-100) based on their current skills vs what is typically required for the role. Identify the exact key skills they are missing for each role.

Return ONLY a valid JSON object in the exact format shown below. Do not include markdown blocks like \`\`\`json.

{
 "recommended_jobs": [
  {
   "title": "Job Title",
   "match_percentage": 75,
   "missing_skills": ["Skill1", "Skill2"]
  }
 ]
}
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
            temperature: 0.2, // Slightly higher for creating recommendations but keep it factual
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Parse Gemini's response text
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{"recommended_jobs": []}'
    
    // Clean up potential markdown blocks
    const cleanText = rawText.replace(/```json\n?|\n?```/g, '').trim()
    
    let result = { recommended_jobs: [] }
    try {
      result = JSON.parse(cleanText)
      if (!result.recommended_jobs || !Array.isArray(result.recommended_jobs)) {
        result = { recommended_jobs: [] }
      }
    } catch (e) {
      console.error("Failed to parse Gemini output as JSON:", cleanText)
      result = { recommended_jobs: [] }
    }

    return NextResponse.json(result)
    
  } catch (error) {
    console.error("API Error in recommend-jobs:", error)
    return NextResponse.json({ error: "Failed to recommend jobs" }, { status: 500 })
  }
}
