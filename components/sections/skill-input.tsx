'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

interface SkillInputSectionProps {
  onAnalyze: () => void
}

const AVAILABLE_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'SQL', 'PostgreSQL', 'MongoDB', 'Docker',
  'AWS', 'Git', 'REST APIs', 'GraphQL', 'TailwindCSS',
  'Vue.js', 'Angular', 'Express.js', 'Django', 'FastAPI'
]

const JOB_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'DevOps Engineer',
  'Machine Learning Engineer',
  'Product Manager',
  'Solutions Architect',
  'Software Architect',
  'Tech Lead'
]

export default function SkillInputSection({ onAnalyze }: SkillInputSectionProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedRole, setSelectedRole] = useState('')
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [customSkill, setCustomSkill] = useState('')

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill])
      setCustomSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill))
  }

  const handleAnalyze = () => {
    if (selectedSkills.length > 0 && selectedRole) {
      onAnalyze()
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="input-section" className="py-16 sm:py-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Let's Get Started</h2>
          <p className="text-muted-foreground text-lg">Share your current skills and desired role</p>
        </div>

        <Card className="bg-card border-border/50 shadow-lg p-6 sm:p-8">
          {/* Current Skills Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Your Current Skills
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {AVAILABLE_SKILLS.map(skill => (
                <div key={skill} className="flex items-center gap-2">
                  <Checkbox
                    id={skill}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={() => toggleSkill(skill)}
                    className="border-primary/40 cursor-pointer"
                  />
                  <label htmlFor={skill} className="text-sm cursor-pointer flex-1">{skill}</label>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add custom skill..."
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                className="bg-input border-border/50"
              />
              <Button
                onClick={addCustomSkill}
                variant="outline"
                className="border-primary/30 hover:border-primary/60"
              >
                Add
              </Button>
            </div>

            {selectedSkills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedSkills.map(skill => (
                  <Badge
                    key={skill}
                    className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Target Role Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Target Job Role
            </h3>

            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="w-full px-4 py-2.5 bg-input border border-border/50 rounded-md text-left flex justify-between items-center hover:border-border transition-colors"
              >
                <span className={selectedRole ? 'text-foreground' : 'text-muted-foreground'}>
                  {selectedRole || 'Select your target role...'}
                </span>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {showRoleDropdown && (
                <div className="absolute top-full mt-2 w-full bg-card border border-border/50 rounded-md shadow-lg z-10">
                  {JOB_ROLES.map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role)
                        setShowRoleDropdown(false)
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-primary/10 transition-colors border-b border-border/30 last:border-b-0"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resume Upload Section */}
          <div className="mb-8 p-4 border-2 border-dashed border-border/50 rounded-md text-center">
            <svg className="w-8 h-8 mx-auto mb-2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-muted-foreground mb-2">Upload your resume (optional)</p>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
            <Button variant="outline" size="sm" className="border-border/50">
              Choose File
            </Button>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={selectedSkills.length === 0 || !selectedRole}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold py-6"
          >
            Analyze My Skills
          </Button>

          {(selectedSkills.length === 0 || !selectedRole) && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Please select at least one skill and a target role to continue
            </p>
          )}
        </Card>
      </div>
    </section>
  )
}
