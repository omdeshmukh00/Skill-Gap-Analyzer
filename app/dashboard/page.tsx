'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Target, BookOpen, Clock, Activity, ArrowRight, CheckCircle2 } from 'lucide-react'

type RoadmapStep = {
  week: string
  focus: string
  tasks: string[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [missingSkills, setMissingSkills] = useState<string[]>([])
  const [targetRole, setTargetRole] = useState('')
  const [matchScore, setMatchScore] = useState(0)
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([])

  useEffect(() => {
    try {
      setSkills(JSON.parse(localStorage.getItem('skills') || '[]'))
      setMissingSkills(JSON.parse(localStorage.getItem('missingSkills') || '[]'))
      setTargetRole(localStorage.getItem('targetRole') || '')
      setMatchScore(parseInt(localStorage.getItem('matchScore') || '0', 10))
      setRoadmap(JSON.parse(localStorage.getItem('roadmap') || '[]'))
      setIsLoaded(true)
    } catch (e) {
      console.error("Dashboard failed to load properties", e)
      router.push('/')
    }
  }, [router])

  if (!isLoaded) return null // Or a subtle loader

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8 bg-background relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full point-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full point-events-none -z-10" />

      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in pt-8 pb-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
              <Trophy className="mr-2 h-4 w-4" />
              Career Dashboard
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Your Progress Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Track your journey towards becoming a <span className="text-foreground font-semibold">{targetRole}</span>.
            </p>
          </div>
          <Button onClick={() => router.push('/profiling')} variant="outline" className="shadow-sm">
            Update Profile
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pt-4">
          
          {/* Main Readiness Score */}
          <Card className="lg:col-span-2 p-8 bg-card border shadow-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10 w-full">
              <div className="flex-1 space-y-4 text-center sm:text-left">
                <h2 className="text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
                  <Activity className="w-6 h-6 text-primary" /> Career Readiness Score
                </h2>
                <p className="text-muted-foreground">
                  You are {matchScore}% of the way to meeting the core requirements for your target role. 
                  {matchScore >= 80 ? " You're in a great spot!" : matchScore >= 50 ? " Keep learning!" : " Lots of potential ahead."}
                </p>
                <div className="pt-4">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Progress</span>
                    <span className="text-primary">{matchScore}%</span>
                  </div>
                  <Progress value={matchScore} className="h-3" />
                </div>
              </div>
              
              <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center bg-background rounded-full shadow-lg border border-border/50">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
                  <circle
                    cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={`${(matchScore / 100) * (2 * Math.PI * 54)} ${2 * Math.PI * 54}`}
                    className="text-primary transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="text-center flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-violet-500">
                    {matchScore}<span className="text-2xl">%</span>
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats Column */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <Card className="p-6 flex flex-col items-center justify-center text-center border-border/50 shadow-sm bg-background hover:bg-muted/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1">{skills.length}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Acquired Skills</div>
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center text-center border-border/50 shadow-sm bg-background hover:bg-muted/5 transition-colors">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1">{missingSkills.length}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Skills to Learn</div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 pt-4">
          
          {/* Missing Skills Summary */}
          <Card className="p-6 sm:p-8 bg-card border shadow-sm flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Target Skills
            </h3>
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-3 flex-1 content-start">
                {missingSkills.map(skill => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm bg-muted text-foreground border-border/50">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground text-center p-8 bg-muted/20 rounded-xl border border-dashed border-border/50">
                You have met all primary technical requirements for this role!
              </div>
            )}
          </Card>

          {/* Current Actions / Roadmap snippet */}
          <Card className="p-6 sm:p-8 bg-card border shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Up Next
              </h3>
              <Button onClick={() => router.push('/roadmap')} variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 h-8">
                View Full Plan <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-4 flex-1">
              {roadmap.slice(0, 2).map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/50 bg-background hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">{step.week}</Badge>
                    <span className="font-semibold text-sm truncate">{step.focus}</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-1 mt-3 border-l-2 border-border/50 pl-3">
                    {step.tasks.slice(0, 2).map((t, i) => (
                      <li key={i} className="truncate">{t}</li>
                    ))}
                    {step.tasks.length > 2 && <li className="text-xs text-primary pt-1">+{step.tasks.length - 2} more tasks</li>}
                  </ul>
                </div>
              ))}
              {roadmap.length === 0 && (
                <div className="text-center py-8 text-muted-foreground border border-dashed rounded-xl">
                  No active learning plan. Generate one in analysis.
                </div>
              )}
            </div>
          </Card>
          
        </div>
      </div>
    </div>
  )
}