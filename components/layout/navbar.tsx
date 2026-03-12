'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit">
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M9 13a4.5 4.5 0 0 0 3-4" />
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                <path d="M6 18a4 4 0 0 1-1.967-.516" />
                <path d="M12 13h4" />
                <path d="M12 18h6a2 2 0 0 1 2 2v1" />
                <path d="M12 8h8" />
                <path d="M16 8V5a2 2 0 0 1 2-2" />
                <circle cx="16" cy="13" r="2" />
                <circle cx="18" cy="3" r="2" />
              </svg>
            </div>
            <span className="font-bold sm:inline-block text-lg">
              Skill Gap Analyzer
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Home
            </Link>
            <Link
              href="/profiling"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Profiler
            </Link>
            <Link
              href="/analysis"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Analysis
            </Link>
            <Link
              href="/roadmap"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Roadmap
            </Link>
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
