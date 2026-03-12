import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  onAnalyzeClick: () => void
}

export default function HeroSection({ onAnalyzeClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 px-4 py-20 sm:py-28 md:py-32">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance leading-tight mb-6">
          AI Skill Gap Analyzer
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover the skills you need to reach your dream career with AI-powered analysis and personalized learning roadmaps.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={onAnalyzeClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base font-semibold"
          >
            Analyze My Skills
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-primary/30 hover:border-primary/60"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
