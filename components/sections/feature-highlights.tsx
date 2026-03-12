import { Card } from '@/components/ui/card'

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze your skills and career goals to provide personalized insights and recommendations.'
  },
  {
    icon: '🗺️',
    title: 'Personalized Roadmap',
    description: 'Get a customized learning path with clear milestones, timeframes, and resources tailored to your career aspirations.'
  },
  {
    icon: '⚡',
    title: 'Industry-Aligned Suggestions',
    description: 'Discover skills and technologies that are currently in-demand and valued by top companies in your target industry.'
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'Monitor your skill development with visual dashboards and detailed progress metrics for each competency area.'
  },
  {
    icon: '🎓',
    title: 'Curated Resources',
    description: 'Access a carefully selected collection of courses, tutorials, and learning materials from top educational platforms.'
  },
  {
    icon: '🚀',
    title: 'Career Acceleration',
    description: 'Bridge your skill gaps faster with optimized learning sequences and practical project recommendations.'
  }
]

export default function FeatureHighlights() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Why Choose Our Analyzer?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how our platform can accelerate your career growth with AI-driven insights and personalized guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card border-border/50 shadow-lg p-6 hover:shadow-xl hover:border-border/80 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Ready to transform your career?</p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors shadow-lg">
            Start Your Analysis
          </button>
        </div>
      </div>
    </section>
  )
}
