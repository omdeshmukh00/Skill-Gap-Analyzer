'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import HeroSection from '@/components/sections/hero'
import SkillInputSection from '@/components/sections/skill-input'
import AnalysisResultsSection from '@/components/sections/analysis-results'
import CareerDashboard from '@/components/sections/career-dashboard'
import FeatureHighlights from '@/components/sections/feature-highlights'
import Footer from '@/components/sections/footer'

export default function Home() {
  const [showResults, setShowResults] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onAnalyzeClick={() => document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })} />
      <SkillInputSection onAnalyze={() => setShowResults(true)} />
      {showResults && (
        <>
          <AnalysisResultsSection />
          <CareerDashboard />
        </>
      )}
      <FeatureHighlights />
      <Footer />
    </main>
  )
}
