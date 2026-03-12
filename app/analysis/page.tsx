'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Briefcase, Activity, AlertCircle, ArrowRight, Loader2, Target } from 'lucide-react'
import { jobRoles } from '@/lib/jobRoles'

type RecommendedJob = {
  title: string
  match_percentage: number
  missing_skills: string[]
}

export default function AnalysisPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<string[]>([])
  const [targetRole, setTargetRole] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<RecommendedJob[]>([])
  const [selectedJob, setSelectedJob] = useState<RecommendedJob | null>(null)

  useEffect(() => {
    const storedSkills = localStorage.getItem('skills')
    if (storedSkills) {
      try {
        setSkills(JSON.parse(storedSkills))
      } catch (e) {
        console.error("Failed to parse skills")
      }
    } else {
      // If no skills, redirect back
      router.push('/profiling')
    }
  }, [router])

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    
    try {
      const res = await fetch('/api/recommend-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          skills,
          targetRole 
        })
      })
      
      if (!res.ok) throw new Error("Failed to get recommendations")
        
      const data = await res.json()
      if (data.recommended_jobs) {
        setRecommendations(data.recommended_jobs)
        if (data.recommended_jobs.length > 0) {
          setSelectedJob(data.recommended_jobs[0])
        }
      }
    } catch (error) {
      console.error("Analysis error:", error)
      // Fallback
      const fallback: RecommendedJob = {
        title: targetRole || "Full Stack Developer",
        match_percentage: 65,
        missing_skills: ["GraphQL", "Docker", "AWS"]
      }
      setRecommendations([fallback])
      setSelectedJob(fallback)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateRoadmap = () => {
    if (selectedJob) {
      localStorage.setItem('targetRole', selectedJob.title)
      localStorage.setItem('missingSkills', JSON.stringify(selectedJob.missing_skills))
      localStorage.setItem('matchScore', selectedJob.match_percentage.toString())
      router.push('/roadmap')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-8 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[40%] h-[50%] rounded-full bg-primary/5 blur-3xl opacity-50 -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in pt-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
              <Activity className="mr-2 h-4 w-4" />
              Step 2: AI Analysis
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Skill Gap Detection</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We found {skills.length} skills in your profile. Select your target career role to see where you stand.
            </p>
          </div>
          
          <div className="w-full md:w-72 space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> Target Role
            </label>
            <div className="flex gap-2">
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select a role..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(jobRoles).map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={runAnalysis} disabled={!targetRole || isAnalyzing}>
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Analyze"}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Area */}
        {recommendations.length > 0 && selectedJob && (
          <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Main Info Card */}
            <Card className="lg:col-span-2 p-6 sm:p-8 bg-card border shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedJob.title}</h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Recommended Role
                  </p>
                </div>
                
                <div className="flex items-center gap-4 bg-background/50 border rounded-xl p-4 shadow-sm">
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                      {selectedJob.match_percentage}%
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Match</div>
                  </div>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-muted/30"
                        strokeDasharray="100, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3"
                      />
                      <path
                        className="text-primary transition-all duration-1000 ease-out"
                        strokeDasharray={`${selectedJob.match_percentage}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none" stroke="currentColor" strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    Missing Critical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.missing_skills.length > 0 ? (
                      selectedJob.missing_skills.map((skill) => (
                        <Badge key={skill} variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-transparent text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">You have all core skills!</Badge>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <Button onClick={handleGenerateRoadmap} size="lg" className="w-full shadow-md group">
                    Generate Learning Roadmap
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Alternates Card */}
            <Card className="p-6 bg-muted/30 border border-border/50">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                Other Matches
                <Badge variant="outline" className="font-mono text-xs">{recommendations.length - 1}</Badge>
              </h3>
              <div className="space-y-3">
                {recommendations.filter(r => r.title !== selectedJob.title).map((job, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedJob(job)}
                    className="w-full text-left p-3 rounded-lg border bg-background hover:border-primary/50 hover:shadow-sm transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-sm group-hover:text-primary transition-colors">{job.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {job.missing_skills.length} skills to learn
                      </div>
                    </div>
                    <div className="text-sm font-bold bg-primary/10 text-primary px-2 py-1 rounded">
                      {job.match_percentage}%
                    </div>
                  </button>
                ))}
                {recommendations.length <= 1 && (
                  <div className="text-sm text-muted-foreground text-center py-8">
                    Select a target role and analyze to see alternative career paths here.
                  </div>
                )}
              </div>
            </Card>

          </div>
        )}
      </div>
    </div>
  )
}