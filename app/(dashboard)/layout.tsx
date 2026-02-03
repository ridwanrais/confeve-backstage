import React from "react"
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <DashboardHeader />
        
        <main className="flex-1 overflow-auto pt-20 pb-8 px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
