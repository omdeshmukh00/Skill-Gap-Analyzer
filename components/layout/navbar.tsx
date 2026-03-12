'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { SignInButton, UserButton, useUser } from "@clerk/nextjs"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 max-w-7xl items-center justify-between mx-auto px-4">

        {/* Left */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">
              Skill Gap Analyzer
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/profiling">Profiler</Link>
            <Link href="/analysis">Analysis</Link>
            <Link href="/roadmap">Roadmap</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all scale-0 dark:scale-100" />
          </Button>

          {/* Auth UI */}
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          ) : (
            <UserButton />
          )}

        </div>

      </div>
    </header>
  )
}