'use client'

import React from "react"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Ticket, Plus, Trash2, Edit } from 'lucide-react'

interface TicketType {
  id: string
  name: string
  price: number
  quantity: number
  sold: number
  event: string
  saleStart: string
  saleEnd: string
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([
    {
      id: '1',
      name: 'General Admission',
      price: 150,
      quantity: 500,
      sold: 284,
      event: 'Tech Summit 2024',
      saleStart: '2024-01-01',
      saleEnd: '2024-03-14',
    },
    {
      id: '2',
      name: 'VIP Pass',
      price: 300,
      quantity: 100,
      sold: 45,
      event: 'Tech Summit 2024',
      saleStart: '2024-01-01',
      saleEnd: '2024-03-14',
    },
    {
      id: '3',
      name: 'Student Ticket',
      price: 75,
      quantity: 200,
      sold: 89,
      event: 'Tech Summit 2024',
      saleStart: '2024-01-01',
      saleEnd: '2024-03-14',
    },
  ])

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    event: '',
    saleStart: '',
    saleEnd: '',
  })

  const handleAddTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    setFormData({
      name: '',
      price: '',
      quantity: '',
      event: '',
      saleStart: '',
      saleEnd: '',
    })
    setOpen(false)
  }

  const totalRevenue = tickets.reduce((acc, ticket) => {
    return acc + (ticket.price * ticket.sold)
  }, 0)

  const totalTicketsSold = tickets.reduce((acc, ticket) => acc + ticket.sold, 0)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tickets</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage ticket types for your events
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Ticket Type</DialogTitle>
              <DialogDescription>
                Add a new ticket type to your event
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddTicket} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Ticket Name
                </label>
                <Input
                  placeholder="e.g., General Admission"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Price
                  </label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Quantity
                  </label>
                  <Input
                    type="number"
                    placeholder="500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Event
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                  required
                >
                  <option value="">Select an event</option>
                  <option value="Tech Summit 2024">Tech Summit 2024</option>
                  <option value="Design Workshop">Design Workshop</option>
                  <option value="Networking Event">Networking Event</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Sale Start
                  </label>
                  <Input
                    type="date"
                    value={formData.saleStart}
                    onChange={(e) => setFormData({ ...formData, saleStart: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Sale End
                  </label>
                  <Input
                    type="date"
                    value={formData.saleEnd}
                    onChange={(e) => setFormData({ ...formData, saleEnd: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!formData.name}>
                  Create Ticket
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tickets Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{totalTicketsSold}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">${totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Types</CardTitle>
        </CardHeader>
        <CardContent>
          {tickets.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket Name</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Sold / Total</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Sale Period</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium text-foreground">
                        {ticket.name}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {ticket.event}
                      </TableCell>
                      <TableCell className="text-foreground">
                        ${ticket.price}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {ticket.sold} / {ticket.quantity}
                      </TableCell>
                      <TableCell className="text-accent font-semibold">
                        ${(ticket.price * ticket.sold).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(ticket.saleStart)} to {formatDate(ticket.saleEnd)}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No tickets created yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
