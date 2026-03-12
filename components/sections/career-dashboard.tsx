'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, TrendingUp, Compass, Star, PlayCircle, ExternalLink } from 'lucide-react'

const COURSES = [
  {
    id: 1,
    title: 'Advanced TypeScript for Scalable Applications',
    platform: 'Udemy',
    duration: '35 hours',
    rating: 4.8,
    price: '$49.99',
    level: 'Advanced'
  },
  {
    id: 2,
    title: 'System Design Masterclass',
    platform: 'Educative',
    duration: '20 hours',
    rating: 4.9,
    price: '$199/year',
    level: 'Advanced'
  },
  {
    id: 3,
    title: 'Docker & Kubernetes: Complete Guide',
    platform: 'Udemy',
    duration: '22 hours',
    rating: 4.7,
    price: '$49.99',
    level: 'Intermediate'
  },
  {
    id: 4,
    title: 'Microservices Architecture with Node.js',
    platform: 'Pluralsight',
    duration: '18 hours',
    rating: 4.6,
    price: '$299/year',
    level: 'Advanced'
  }
]

const SKILL_CATEGORIES = [
  { name: 'Frontend', current: 8, required: 8, percentage: 100 },
  { name: 'Backend', current: 6, required: 9, percentage: 67 },
  { name: 'DevOps', current: 2, required: 7, percentage: 29 },
  { name: 'Database', current: 4, required: 6, percentage: 67 },
  { name: 'System Design', current: 1, required: 8, percentage: 13 },
]

export default function CareerDashboard() {
  return (
    <section className="py-20 sm:py-28 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            <TrendingUp className="mr-2 h-4 w-4" />
            Your Dashboard
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Action Plan & Resources</h2>
          <p className="text-muted-foreground text-lg">Track your progress and enroll in highly-rated courses to close your gaps.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Match */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/10 via-background to-accent/5 border-border/50 shadow-sm p-6 sm:p-10 relative overflow-hidden flex items-center">
            {/* Background blur decorative */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 w-full relative z-10">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold mb-2">Overall Skill Match</h3>
                <p className="text-muted-foreground text-lg mb-6">to Full Stack Developer</p>
                <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>Progress</span>
                    <span className="text-primary">56%</span>
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary rounded-full h-2.5 w-[56%]" />
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative w-40 h-40 flex items-center justify-center bg-background rounded-full shadow-lg border border-border/50">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="url(#dashboardGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${(56 / 100) * (2 * Math.PI * 54)} ${2 * Math.PI * 54}`}
                      strokeDashoffset="0"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-violet-500">56<span className="text-2xl">%</span></span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-1">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 flex flex-col items-center justify-center text-center border-border/50 shadow-sm bg-background hover:bg-muted/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1">25</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Skills Needed</div>
            </Card>
            <Card className="p-5 flex flex-col items-center justify-center text-center border-border/50 shadow-sm bg-background hover:bg-muted/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1">14</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Learned</div>
            </Card>
            <Card className="p-5 flex flex-col items-center justify-center text-center border-border/50 shadow-sm bg-background hover:bg-muted/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1">16<span className="text-xl">w</span></div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Timeline</div>
            </Card>
            <Card className="p-5 flex flex-col items-center justify-center text-center border-border/50 shadow-sm bg-background hover:bg-muted/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                <Star className="w-5 h-5" />
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1">4.8</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Avg Rating</div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skill Categories */}
          <Card className="lg:col-span-1 bg-background border-border/50 shadow-sm p-6 sm:p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Category Breakdown
            </h3>
            <div className="space-y-6 flex-1">
              {SKILL_CATEGORIES.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground text-sm">{category.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{category.current}/{category.required}</span>
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${category.percentage === 100 ? 'bg-green-500' : category.percentage > 50 ? 'bg-primary' : 'bg-red-400'}`} 
                      style={{ width: `${category.percentage}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Courses */}
          <Card className="lg:col-span-2 bg-background border-border/50 shadow-sm p-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Handpicked Courses
              </h3>
              <Button variant="ghost" size="sm" className="hidden sm:flex text-primary hover:text-primary hover:bg-primary/10">
                View all <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 flex-1">
              {COURSES.map((course) => (
                <div key={course.id} className="group p-5 bg-background rounded-xl border border-border/60 hover:border-primary/40 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 whitespace-nowrap font-normal">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded text-xs font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">{course.title}</h4>
                  
                  <div className="mt-auto pt-4 flex flex-col gap-3">
                    <div className="flex items-center text-sm text-muted-foreground gap-3">
                      <span className="flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5" /> {course.platform}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                      <span>{course.duration}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-border/40 pt-3 mt-1">
                      <span className="font-bold text-foreground">{course.price}</span>
                      <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground h-8 text-xs px-4">
                        Enroll
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 sm:hidden">
              View all courses
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Additional icons used in this component
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
)

const Calendar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
)

const Target = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
)
