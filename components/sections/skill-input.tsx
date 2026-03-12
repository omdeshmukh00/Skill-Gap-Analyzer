'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { UploadCloud, FileText, CheckCircle2, Search, X, Plus } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
  'AI Engineer',
  'Tech Lead'
]

export default function SkillInputSection({ onAnalyze }: SkillInputSectionProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedRole, setSelectedRole] = useState('')
  const [openRolebox, setOpenRolebox] = useState(false)
  const [customSkill, setCustomSkill] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

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
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Just a simulation for UI purposes
    setUploadedFile(file)
    // Auto-detect simulation
    const detected = ['React', 'TypeScript', 'Node.js']
    const newSkills = Array.from(new Set([...selectedSkills, ...detected]))
    setSelectedSkills(newSkills)
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  return (
    <section id="input-section" className="py-20 sm:py-28 px-4 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Provide Your Profile</h2>
          <p className="text-muted-foreground text-lg">Upload your resume and tell us your career goals</p>
        </div>

        <div className="space-y-8">
          
          {/* Resume Upload Card */}
          <Card className="p-1 border-border/50 shadow-sm overflow-hidden bg-background">
            <div className="bg-muted/20 p-6 sm:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">1</span>
                    Upload Resume
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 ml-9">AI will automatically extract your skills</p>
                </div>
              </div>

              {!uploadedFile ? (
                <div 
                  className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-200 ease-in-out cursor-pointer flex flex-col items-center justify-center ${isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border/60 hover:border-primary/50 hover:bg-muted/50'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  <div className="p-4 bg-background rounded-full shadow-sm mb-4 border border-border/50">
                    <UploadCloud className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-1">Click to upload or drag and drop</h4>
                  <p className="text-sm text-muted-foreground mb-4">PDF, DOCX up to 10MB</p>
                  <Input 
                    id="resume-upload" 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    className="hidden" 
                    onChange={handleFileInput}
                  />
                  <Button variant="outline" className="pointer-events-none">Select File</Button>
                </div>
              ) : (
                <div className="border border-primary/20 bg-primary/5 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-background rounded-lg shadow-sm border border-border/50">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold truncate max-w-[200px] sm:max-w-[300px]">{uploadedFile.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">Skills extracted successfully</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={removeFile} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <X className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Target Role & Custom Skills */}
          <Card className="p-6 sm:p-10 border-border/50 shadow-sm bg-background">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">2</span>
                Target Role
              </h3>
              <p className="text-sm text-muted-foreground mb-6 ml-9">What is your dream job?</p>

              <div className="ml-0 sm:ml-9">
                <Popover open={openRolebox} onOpenChange={setOpenRolebox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openRolebox}
                      className="w-full justify-between h-12 text-base font-normal border-border/60 hover:border-primary/50 bg-background"
                    >
                      {selectedRole ? selectedRole : "Search or select a role..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] sm:w-[500px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search job roles..." />
                      <CommandList>
                        <CommandEmpty>No role found.</CommandEmpty>
                        <CommandGroup>
                          {JOB_ROLES.map((role) => (
                            <CommandItem
                              key={role}
                              value={role}
                              onSelect={() => {
                                setSelectedRole(role)
                                setOpenRolebox(false)
                              }}
                              className="cursor-pointer py-2.5"
                            >
                              <CheckCircle2
                                className={`mr-2 h-4 w-4 ${selectedRole === role ? "opacity-100 text-primary" : "opacity-0"}`}
                              />
                              {role}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">3</span>
                Detected & Custom Skills
              </h3>
              <p className="text-sm text-muted-foreground mb-6 ml-9">Review extracted skills or add them manually</p>

              <div className="ml-0 sm:ml-9 space-y-6">
                
                {/* Visual Tags array */}
                <div className="flex flex-wrap gap-2.5 bg-muted/30 p-4 rounded-xl border border-border/50 min-h-[100px] items-start transition-all">
                  {selectedSkills.length === 0 ? (
                    <span className="text-sm text-muted-foreground/70 my-auto mx-auto italic">No skills added yet</span>
                  ) : (
                    selectedSkills.map(skill => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary transition-all animate-in fade-in zoom-in-95 group font-medium"
                      >
                        {skill}
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeSkill(skill); }}
                          className="ml-2 opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-full transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))
                  )}
                </div>

                {/* Add Custom Skill */}
                <div className="flex gap-2 relative">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Type a skill and press Enter..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                      className="pl-9 h-11 bg-background border-border/60 hover:border-primary/30 transition-colors"
                    />
                  </div>
                  <Button
                    onClick={addCustomSkill}
                    variant="default"
                    className="h-11 px-6 shadow-sm"
                    disabled={!customSkill.trim()}
                  >
                    <Plus className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Add</span>
                  </Button>
                </div>

                {/* Popular Skills Quick Add */}
                <div>
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground">Popular Skills Suggestion</h4>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SKILLS.slice(0, 10).map(skill => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <Badge
                          key={skill}
                          variant="outline"
                          className={`px-3 py-1 cursor-pointer transition-all ${isSelected ? 'opacity-50 grayscale border-dashed pointer-events-none' : 'hover:border-primary/50 hover:bg-muted/50'}`}
                          onClick={() => !isSelected && toggleSkill(skill)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {skill}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Analyze Button */}
            <div className="pt-6 border-t border-border/50 text-center sm:text-right">
              <span className="text-xs text-muted-foreground mr-4 block sm:inline-block mb-3 sm:mb-0">
                {(selectedSkills.length === 0 || !selectedRole) && "Select a role and add some skills to continue"}
              </span>
              <Button
                onClick={handleAnalyze}
                disabled={selectedSkills.length === 0 || !selectedRole}
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold px-10 h-14 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 disabled:hover:scale-100"
              >
                Reveal Career Insights
              </Button>
            </div>
            
          </Card>
        </div>
      </div>
    </section>
  )
}
