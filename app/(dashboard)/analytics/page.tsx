'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const salesData = [
  { date: 'Jan 1', sales: 45, revenue: 6750 },
  { date: 'Jan 8', sales: 62, revenue: 9300 },
  { date: 'Jan 15', sales: 58, revenue: 8700 },
  { date: 'Jan 22', sales: 73, revenue: 10950 },
  { date: 'Jan 29', sales: 89, revenue: 13350 },
  { date: 'Feb 5', sales: 102, revenue: 15300 },
  { date: 'Feb 12', sales: 128, revenue: 19200 },
  { date: 'Feb 19', sales: 156, revenue: 23400 },
]

const eventData = [
  { name: 'Tech Summit', revenue: 42500 },
  { name: 'Design Workshop', revenue: 8750 },
  { name: 'Networking Event', revenue: 19200 },
  { name: 'Web Conference', revenue: 31500 },
]

const ticketTypeData = [
  { name: 'General Admission', value: 156, fill: 'oklch(0.6 0.18 263)' },
  { name: 'VIP Pass', value: 45, fill: 'oklch(0.5 0.15 150)' },
  { name: 'Student Ticket', value: 89, fill: 'oklch(0.7 0.12 100)' },
  { name: 'Early Bird', value: 65, fill: 'oklch(0.55 0.14 200)' },
]

export default function AnalyticsPage() {
  const totalRevenue = eventData.reduce((acc, item) => acc + item.revenue, 0)
  const totalTickets = ticketTypeData.reduce((acc, item) => acc + item.value, 0)
  const averageTicketPrice = totalRevenue / totalTickets

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your event performance and revenue metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Across all events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tickets Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{totalTickets}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Across all events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Ticket Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">
              ${Math.round(averageTicketPrice)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Per ticket sold
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>
            Ticket sales and revenue over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sales: {
                label: 'Tickets Sold',
                color: 'oklch(0.6 0.18 263)',
              },
              revenue: {
                label: 'Revenue',
                color: 'oklch(0.5 0.15 150)',
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="oklch(0.6 0.18 263)"
                  name="Tickets Sold"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.5 0.15 150)"
                  name="Revenue ($)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Event */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Event</CardTitle>
            <CardDescription>
              Total revenue generated per event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  color: 'oklch(0.6 0.18 263)',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="oklch(0.6 0.18 263)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Ticket Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of tickets sold by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                'General Admission': { label: 'General Admission' },
                'VIP Pass': { label: 'VIP Pass' },
                'Student Ticket': { label: 'Student Ticket' },
                'Early Bird': { label: 'Early Bird' },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ticketTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
