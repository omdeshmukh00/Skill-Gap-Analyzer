import { NextResponse } from "next/server"
import { jobRoles } from "@/lib/jobRoles"

export async function POST(req: Request) {

  try {

    const { skills, targetRole } = await req.json()

    if (!skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { error: "Skills missing" },
        { status: 400 }
      )
    }

    const userSkills = skills.map((s: string) => s.toLowerCase())

    const rolesToCheck = targetRole
      ? [targetRole]
      : Object.keys(jobRoles)

    const results = rolesToCheck.map(role => {

      const requiredSkills =
        jobRoles[role as keyof typeof jobRoles] || []

      const requiredLower = requiredSkills.map(s =>
        s.toLowerCase()
      )

      const matched = requiredLower.filter(skill =>
        userSkills.includes(skill)
      )

      const missing = requiredSkills.filter(skill =>
        !userSkills.includes(skill.toLowerCase())
      )

      const match =
        Math.round((matched.length / requiredSkills.length) * 100)

      return {
        title: role,
        match_percentage: match,
        missing_skills: missing.slice(0,5)
      }

    })

    const sorted = results.sort(
      (a,b)=>b.match_percentage-a.match_percentage
    )

    return NextResponse.json({
      recommended_jobs: sorted.slice(0,4)
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    )

  }

}