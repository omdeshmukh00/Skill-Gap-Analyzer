import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
        return 'bg-red-500/20 text-red-700 dark:text-red-400'
      case 'Medium':
        return 'bg-orange-500/20 text-orange-700 dark:text-orange-400'
      case 'Low':
        return 'bg-green-500/20 text-green-700 dark:text-green-400'
      default:
        return 'bg-primary/20 text-primary'
    }
  }

  return (
    <section id="results-section" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Your Analysis Results</h2>
          <p className="text-muted-foreground text-lg">AI-powered insights for your career growth</p>
        </div>

        {/* Missing Skills */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-card border-border/50 shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6">Missing Skills</h3>
            <div className="space-y-4">
              {ANALYSIS_DATA.missingSkills.map((item, idx) => (
                <div key={idx} className="p-4 bg-background/50 rounded-lg border border-border/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{item.skill}</h4>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-border/50 rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${item.importance}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.importance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Suggested Tools */}
          <Card className="bg-card border-border/50 shadow-lg p-6 sm:p-8">
            <h3 className="text-xl font-semibold mb-6">Recommended Tech Stack</h3>
            <div className="grid grid-cols-2 gap-3">
              {ANALYSIS_DATA.suggestedTools.map((tool, idx) => (
                <div key={idx} className="p-3 bg-background/50 rounded-lg border border-border/30 text-center">
                  <div className="text-sm font-semibold text-foreground">{tool.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tool.category}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Learning Roadmap */}
        <Card className="bg-card border-border/50 shadow-lg p-6 sm:p-8">
          <h3 className="text-2xl font-semibold mb-8">Personalized Learning Roadmap</h3>
          <div className="space-y-6">
            {ANALYSIS_DATA.roadmap.map((item) => (
              <div key={item.step} className="flex gap-6">
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md">
                    {item.step}
                  </div>
                  {item.step < ANALYSIS_DATA.roadmap.length && (
                    <div className="w-1 h-12 bg-gradient-to-b from-primary to-primary/20 ml-5.5 mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                    <span className="text-sm text-muted-foreground mt-1 sm:mt-0 bg-background/50 px-3 py-1 rounded-full w-fit">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.resources.map((resource, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
