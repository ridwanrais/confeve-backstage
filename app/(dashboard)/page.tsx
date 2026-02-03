'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Ticket, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    {
      label: 'Total Events',
      value: '12',
      icon: Calendar,
      href: '/events',
    },
    {
      label: 'Tickets Sold',
      value: '348',
      icon: Ticket,
      href: '/tickets',
    },
    {
      label: 'Total Revenue',
      value: '$8,450',
      icon: TrendingUp,
      href: '/analytics',
    },
    {
      label: 'Active Attendees',
      value: '1,245',
      icon: Users,
      href: '/analytics',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="pt-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your event management platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:shadow-xl hover:border-accent/50 transition-all duration-300 cursor-pointer h-full group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                    {stat.label}
                  </CardTitle>
                  <div className="p-2 bg-accent/10 group-hover:bg-accent/20 rounded-lg transition-colors">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">View details</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/events">
            <Card className="hover:shadow-xl hover:border-accent/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 group-hover:bg-accent/20 rounded-lg transition-colors">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <span className="group-hover:text-accent transition-colors">Create Event</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up a new event and start managing registrations
                </p>
                <Button className="w-full">Create Event</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/tickets">
            <Card className="hover:shadow-xl hover:border-accent/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 group-hover:bg-accent/20 rounded-lg transition-colors">
                    <Ticket className="h-5 w-5 text-accent" />
                  </div>
                  <span className="group-hover:text-accent transition-colors">Add Tickets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create ticket types and manage pricing
                </p>
                <Button className="w-full">Add Tickets</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analytics">
            <Card className="hover:shadow-xl hover:border-accent/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 group-hover:bg-accent/20 rounded-lg transition-colors">
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <span className="group-hover:text-accent transition-colors">View Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Track sales and engagement metrics
                </p>
                <Button className="w-full">View Analytics</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Recent Events</h2>
          <Link href="/events">
            <Button variant="outline" className="hover:border-accent/50 hover:text-accent bg-transparent">View All</Button>
          </Link>
        </div>
        
        <Card className="border-dashed hover:border-accent/50 transition-colors">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-accent/60" />
              </div>
              <p className="text-muted-foreground mb-2 font-medium">No events yet</p>
              <p className="text-muted-foreground text-sm mb-6">Create your first event to get started</p>
              <Link href="/events">
                <Button className="bg-accent hover:bg-accent/90">Create Your First Event</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
