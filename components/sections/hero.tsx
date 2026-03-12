import { Button } from '@/components/ui/button'
import { ArrowRight, Upload } from 'lucide-react'

interface HeroSectionProps {
  onAnalyzeClick: () => void
}

export default function HeroSection({ onAnalyzeClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-primary/10 ring-1 ring-primary/5 dark:bg-zinc-900/50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
          AI-Powered Career Intelligence
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          AI Skill Gap <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Analyzer</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          Upload your resume or select your skills to discover missing skills and career opportunities using advanced AI analysis.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Button 
            size="lg" 
            onClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 transition-all hover:scale-105"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Resume
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={onAnalyzeClick}
            className="w-full sm:w-auto px-8 h-14 text-base font-semibold rounded-xl border-border/60 hover:bg-secondary/50 transition-all hover:scale-105"
          >
            Analyze Skills
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
