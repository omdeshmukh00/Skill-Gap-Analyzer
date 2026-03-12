'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { UploadCloud, FileText, X, Plus, ArrowRight, Loader2 } from 'lucide-react'

const extractTextFallback = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve((e.target?.result as string) || "")
    reader.readAsText(file)
  })
}

export default function ProfilingPage() {

  const router = useRouter()

  const [file,setFile] = useState<File | null>(null)
  const [skills,setSkills] = useState<string[]>([])
  const [customSkill,setCustomSkill] = useState("")
  const [isExtracting,setIsExtracting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = async (selectedFile:File) => {

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain"
    ]

    if(!allowed.includes(selectedFile.type)){
      alert("Please upload a valid resume (PDF / DOCX / TXT)")
      return
    }

    setFile(selectedFile)
    setIsExtracting(true)

    try{

      const text = await extractTextFallback(selectedFile)

      const res = await fetch('/api/extract-skills',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({text})
      })

      const data = await res.json()

      if(Array.isArray(data.skills) && data.skills.length>0){

        setSkills(data.skills)
        localStorage.setItem("skills",JSON.stringify(data.skills))

      }else{

        const fallback=["JavaScript","React","Node.js"]

        setSkills(fallback)
        localStorage.setItem("skills",JSON.stringify(fallback))

      }

    }catch(err){

      console.error(err)

      const fallback=["JavaScript","React","Node.js"]

      setSkills(fallback)
      localStorage.setItem("skills",JSON.stringify(fallback))

    }finally{
      setIsExtracting(false)
    }
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files?.[0]){
      processFile(e.target.files[0])
    }
  }

  const removeSkill = (skill:string)=>{
    setSkills(skills.filter(s=>s!==skill))
  }

  const addCustomSkill = (e:React.FormEvent)=>{
    e.preventDefault()

    if(customSkill.trim()){
      setSkills([...skills,customSkill])
      setCustomSkill("")
    }
  }

  const handleContinue = ()=>{
    localStorage.setItem("skills",JSON.stringify(skills))
    router.push("/analysis")
  }

  return (

<div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">

<div className="max-w-3xl w-full space-y-8">

<div className="text-center">

<h1 className="text-4xl font-bold">Upload Your Resume</h1>

<p className="text-muted-foreground mt-2">
AI will analyze your resume and extract your skills
</p>

</div>

<Card className="p-10 text-center border-dashed border-2">

<input
type="file"
ref={fileInputRef}
className="hidden"
accept=".pdf,.doc,.docx,.txt"
onChange={handleFileChange}
/>

<UploadCloud className="mx-auto mb-4 w-12 h-12"/>

<Button onClick={()=>fileInputRef.current?.click()}>
Browse Resume
</Button>

{file && (
<div className="mt-4 flex items-center justify-center gap-2">
<FileText className="w-4 h-4"/>
{file.name}
</div>
)}

{isExtracting && (
<div className="mt-4 flex items-center justify-center">
<Loader2 className="animate-spin"/>
<span className="ml-2">Analyzing Resume...</span>
</div>
)}

</Card>

{skills.length>0 && (

<Card className="p-6">

<h2 className="text-xl font-semibold mb-4">
Detected Skills
</h2>

<div className="flex flex-wrap gap-2 mb-4">

{skills.map(skill=>(
<Badge key={skill}>
{skill}
<button onClick={()=>removeSkill(skill)}>
<X className="w-3 h-3 ml-1"/>
</button>
</Badge>
))}

</div>

<form onSubmit={addCustomSkill} className="flex gap-2 mb-4">

<Input
placeholder="Add skill"
value={customSkill}
onChange={(e)=>setCustomSkill(e.target.value)}
/>

<Button type="submit">
<Plus className="w-4 h-4"/>
</Button>

</form>

<Button onClick={handleContinue}>
Continue to Analysis
<ArrowRight className="ml-2 w-4 h-4"/>
</Button>

</Card>

)}

</div>

</div>

  )
}