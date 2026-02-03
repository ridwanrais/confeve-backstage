'use client'

import React from "react"

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { verifyOTPAndRegister } from '@/app/actions/auth'

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const password = searchParams.get('password') || ''
  const mode = searchParams.get('mode') || 'register'

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length <= 6) {
      setOtp(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await verifyOTPAndRegister(email, password, otp)
      if (result.success) {
        router.push('/')
      } else {
        setError(result.error || 'Failed to verify OTP')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-foreground">EventHub</h1>
        <p className="text-muted-foreground">Verify your email</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter OTP</CardTitle>
          <CardDescription>
            We sent a 6-digit code to {email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium text-foreground">
                One-Time Password
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                value={otp}
                onChange={handleOtpChange}
                disabled={loading}
                maxLength={6}
                className="text-center text-2xl tracking-widest font-mono"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying...' : 'Complete Registration'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Didn't receive the code?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-accent hover:underline"
            >
              Try again
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
