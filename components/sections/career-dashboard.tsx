'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
    <section className="py-16 sm:py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Your Career Dashboard</h2>
          <p className="text-muted-foreground text-lg">Track your progress and resources</p>
        </div>

        {/* Overall Match */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border/50 shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Overall Skill Match</h3>
              <p className="text-muted-foreground mb-4">to Full Stack Developer role</p>
              <Progress value={56} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">You have 56% of required skills</p>
            </div>
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="2" className="text-border/50" />
                  <circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray={`${(56 / 100) * (2 * Math.PI * 55)} ${2 * Math.PI * 55}`}
                    strokeDashoffset="0"
                    className="transform -rotate-90 origin-center"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(96 85 189)" />
                      <stop offset="100%" stopColor="rgb(139 92 246)" />
                    </linearGradient>
                  </defs>
                  <text x="60" y="70" textAnchor="middle" className="text-lg font-bold" fontSize="24">
                    56%
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </Card>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card border-border/50 shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6">Skills by Category</h3>
            <div className="space-y-5">
              {SKILL_CATEGORIES.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.current}/{category.required}</span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card border-border/50 shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6">Progress Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-border/30 text-center">
                <div className="text-2xl font-bold text-primary">25</div>
                <div className="text-xs text-muted-foreground mt-1">Skills Needed</div>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30 text-center">
                <div className="text-2xl font-bold text-primary">14</div>
                <div className="text-xs text-muted-foreground mt-1">Skills Learned</div>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30 text-center">
                <div className="text-2xl font-bold text-accent">12-16</div>
                <div className="text-xs text-muted-foreground mt-1">Weeks Timeline</div>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30 text-center">
                <div className="text-2xl font-bold text-secondary">4.7/5</div>
                <div className="text-xs text-muted-foreground mt-1">Avg Rating</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recommended Courses */}
        <Card className="bg-card border-border/50 shadow-lg p-6 sm:p-8">
          <h3 className="text-xl font-semibold mb-6">Recommended Courses</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {COURSES.map((course) => (
              <div key={course.id} className="p-4 bg-background/50 rounded-lg border border-border/30 hover:border-border/60 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-foreground leading-tight">{course.title}</h4>
                  <Badge className="bg-primary/20 text-primary whitespace-nowrap flex-shrink-0">
                    {course.level}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{course.platform}</p>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">{course.duration}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-foreground">★</span>
                    <span className="text-foreground font-semibold">{course.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">{course.price}</span>
                  <Button size="sm" variant="outline" className="border-primary/30 hover:border-primary/60 text-xs">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
