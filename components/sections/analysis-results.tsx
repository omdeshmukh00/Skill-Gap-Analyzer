import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Target, Route, Wrench } from 'lucide-react'

const ANALYSIS_DATA = {
  missingSkills: [
    { skill: 'Advanced TypeScript', priority: 'High', importance: 95 },
    { skill: 'System Design', priority: 'High', importance: 88 },
    { skill: 'Microservices Architecture', priority: 'Medium', importance: 82 },
    { skill: 'Kubernetes & Container Orchestration', priority: 'Medium', importance: 75 },
    { skill: 'CI/CD Pipelines', priority: 'Medium', importance: 78 },
  ],
  roadmap: [
    {
      step: 1,
      title: 'Master Advanced TypeScript',
      duration: '3-4 weeks',
      description: 'Deep dive into TypeScript generics, utility types, and advanced patterns',
      resources: ['TypeScript Handbook', 'Egghead.io', 'YouTube tutorials']
    },
    {
      step: 2,
      title: 'System Design Fundamentals',
      duration: '4-6 weeks',
      description: 'Learn scalability, load balancing, databases, and distributed systems',
      resources: ['Designing Data-Intensive Applications', 'SystemDesign.one', 'Practice problems']
    },
    {
      step: 3,
      title: 'Microservices & Architecture',
      duration: '3-4 weeks',
      description: 'Build and deploy microservices using Docker and modern frameworks',
      resources: ['Microservices.io', 'Docker documentation', 'Practical projects']
    },
    {
      step: 4,
      title: 'Kubernetes & DevOps',
      duration: '4-5 weeks',
      description: 'Master containerization, orchestration, and deployment automation',
      resources: ['Kubernetes documentation', 'Udemy courses', 'Hands-on labs']
    },
    {
      step: 5,
      title: 'CI/CD & Automation',
      duration: '2-3 weeks',
      description: 'Implement continuous integration and deployment pipelines',
      resources: ['GitHub Actions', 'Jenkins', 'GitLab CI']
    },
    {
      step: 6,
      title: 'Build Real-World Projects',
      duration: '6-8 weeks',
      description: 'Create portfolio projects demonstrating all learned skills',
      resources: ['GitHub', 'Personal projects', 'Open source contributions']
    }
  ],
  suggestedTools: [
    { name: 'TypeScript', category: 'Language' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'Orchestration' },
    { name: 'GraphQL', category: 'API' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Caching' },
  ]
}

export default function AnalysisResultsSection() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-500/20'
      case 'Medium':
        return 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-500/20'
      case 'Low':
        return 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400 border-green-500/20'
      default:
        return 'bg-primary/10 text-primary border-primary/20'
    }
  }

  return (
    <section id="results-section" className="py-20 sm:py-28 px-4 bg-muted/10 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-border/50 bg-background px-3 py-1 text-sm font-medium text-muted-foreground mb-4">
            <Target className="mr-2 h-4 w-4" />
            Analysis Complete
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Career Intelligence Report</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">AI-powered insights detailing the gaps between your current skill set and your dream role.</p>
        </div>

        {/* Missing Skills */}
        <div className="grid lg:grid-cols-5 gap-8 mb-8">
          <Card className="lg:col-span-3 bg-background border-border/50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/10">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Missing Critical Skills
              </h3>
              <Badge variant="secondary" className="font-normal">{ANALYSIS_DATA.missingSkills.length} Identified</Badge>
            </div>
            <div className="p-6 flex-1 space-y-4">
              {ANALYSIS_DATA.missingSkills.map((item, idx) => (
                <div key={idx} className="group p-4 bg-background rounded-xl border border-border/60 hover:border-primary/40 transition-all hover:shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">{item.skill}</h4>
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary rounded-full h-1.5 transition-all duration-1000 ease-out"
                        style={{ width: `${item.importance}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground flex-shrink-0 w-12 text-right">
                      {item.importance}% req
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Suggested Tools */}
          <Card className="lg:col-span-2 bg-background border-border/50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border/50 flex items-center gap-2 bg-muted/10">
              <Wrench className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Recommended Stack</h3>
            </div>
            <div className="p-6 flex-1">
              <div className="grid grid-cols-2 gap-3">
                {ANALYSIS_DATA.suggestedTools.map((tool, idx) => (
                  <div key={idx} className="p-4 bg-background rounded-xl border border-border/50 hover:border-primary/30 transition-colors text-center flex flex-col justify-center min-h-[90px]">
                    <div className="font-semibold text-foreground">{tool.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{tool.category}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Learning Roadmap */}
        <Card className="bg-background border-border/50 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-border/50 bg-muted/10">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
              <Route className="w-6 h-6 text-primary" />
              Personalized Learning Roadmap
            </h3>
            <p className="text-muted-foreground mt-2">A step-by-step guide to bridge your skill gap</p>
          </div>
          <div className="p-6 sm:p-10">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[28px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {ANALYSIS_DATA.roadmap.map((item, idx) => (
                <div key={item.step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-background bg-primary/10 text-primary font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {item.step}
                  </div>
                  
                  {/* Content Box */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl border border-border/50 bg-background shadow-sm hover:border-primary/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                      <Badge variant="secondary" className="w-fit shrink-0 bg-muted/50">{item.duration}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.resources.map((resource, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-normal border-primary/20 text-primary/80 bg-primary/5">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
