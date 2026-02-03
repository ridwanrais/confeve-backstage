'use client'

import { User, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

interface DashboardHeaderProps {
  title?: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-64 border-b border-border bg-background/80 backdrop-blur-sm px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          {title && <h2 className="text-2xl font-bold text-foreground">{title}</h2>}
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground hover:bg-muted hover:text-accent relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground">User</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
