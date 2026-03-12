'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Map, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'

type RoadmapStep = {
  week: string
  focus: string
  tasks: string[]
}

export default function RoadmapPage() {
  const router = useRouter()
  const [targetRole, setTargetRole] = useState('')
  const [missingSkills, setMissingSkills] = useState<string[]>([])
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([])
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    const role = localStorage.getItem('targetRole')
    const missing = localStorage.getItem('missingSkills')
    const skills = localStorage.getItem('skills')
    
    if (!role || !missing) {
      router.push('/analysis')
      return;
    }
    
    setTargetRole(role)
    const parsedMissing = JSON.parse(missing)
    setMissingSkills(parsedMissing)
    
    const parsedSkills = skills ? JSON.parse(skills) : []

    const generateRoadmap = async () => {
      try {
        const res = await fetch('/api/generate-roadmap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            skills: parsedSkills,
            targetRole: role,
            missingSkills: parsedMissing
          })
        })
        
        if (!res.ok) throw new Error("Failed to generate roadmap")

        const data = await res.json()
        if (data.roadmap) {
          setRoadmap(data.roadmap)
          localStorage.setItem('roadmap', JSON.stringify(data.roadmap))
        }
      } catch (error) {
        console.error("Roadmap generation error:", error)
        // Fallback for demo
        const fallback = [
          {
            week: "Week 1",
            focus: `Fundamentals of ${parsedMissing[0] || "Core Tech"}`,
            tasks: ["Set up development environment", "Complete basic tutorials", "Build a 'Hello World' app"]
          },
          {
            week: "Week 2",
            focus: "Advanced Concepts",
            tasks: ["Deep dive into architecture", "Implement in a small project"]
          }
        ]
        setRoadmap(fallback)
        localStorage.setItem('roadmap', JSON.stringify(fallback))
      } finally {
        setIsGenerating(false)
      }
    }

    // Check if we already have it to avoid regen on navigation back
    const storedRoadmap = localStorage.getItem('roadmap')
    if (storedRoadmap && storedRoadmap !== "[]") {
      try {
        setRoadmap(JSON.parse(storedRoadmap))
        setIsGenerating(false)
        return
      } catch (e) {}
    }

    generateRoadmap()
  }, [router])

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[20%] right-0 w-[50%] h-[50%] rounded-full bg-accent/5 blur-3xl opacity-50 -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl opacity-50 -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in pt-8">
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
            <Map className="mr-2 h-4 w-4" />
            Step 3: Personalized Curriculum
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Your Learning Roadmap</h1>
          <p className="text-xl text-muted-foreground">
            A step-by-step path to master the skills needed for <span className="text-foreground font-semibold">{targetRole}</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-sm font-medium mr-2">Focusing on:</span>
            {missingSkills.map(skill => (
              <Badge key={skill} variant="outline" className="bg-background">{skill}</Badge>
            ))}
          </div>
        </div>

        {isGenerating ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground animate-pulse">Our AI is designing your custom curriculum...</p>
          </div>
        ) : (
          <div className="relative pt-8 pb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Timeline Line */}
            <div className="absolute left-[27px] sm:left-[39px] top-12 bottom-20 w-px bg-border max-md:hidden" />
            
            <div className="space-y-8">
              {roadmap.map((step, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row gap-6 md:gap-8 min-h-[120px]">
                  
                  {/* Timeline Node (Hidden on mobile) */}
                  <div className="hidden md:flex flex-col items-center mt-6">
                    <div className="w-5 h-5 rounded-full border-4 border-background bg-primary z-10 shadow-[0_0_0_4px_rgba(var(--primary),0.1)]" />
                  </div>
                  
                  {/* Content Card */}
                  <Card className="flex-1 p-6 relative bg-card border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mt-10 -mr-10 pointer-events-none group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start mb-4">
                      <div>
                        <Badge className="bg-primary/20 text-primary border-none mb-2 font-mono">{step.week}</Badge>
                        <h3 className="text-xl font-bold">{step.focus}</h3>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mt-4">
                      {step.tasks.map((task, taskIdx) => (
                        <li key={taskIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button onClick={() => router.push('/dashboard')} size="lg" className="shadow-lg group px-8">
                Go to Career Dashboard
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}