'use server'

import { cookies } from 'next/headers'

// Mock backend API calls - replace with actual API endpoints
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api'

export async function login(email: string, password: string) {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' }
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Set auth cookie (in real app, this would come from backend)
    const cookieStore = await cookies()
    cookieStore.set('auth_token', `token_${Date.now()}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return { success: true, message: 'Login successful' }
  } catch (error) {
    return { success: false, error: 'Failed to login' }
  }
}

export async function requestOTP(email: string) {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Invalid email address' }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return { success: true, message: 'OTP sent to email' }
  } catch (error) {
    return { success: false, error: 'Failed to request OTP' }
  }
}

export async function verifyOTPAndRegister(email: string, password: string, otp: string) {
  try {
    if (!email || !otp || otp.length !== 6) {
      return { success: false, error: 'Invalid OTP' }
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Set auth cookie (in real app, this would come from backend after registration)
    const cookieStore = await cookies()
    cookieStore.set('auth_token', `token_${Date.now()}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return { success: true, message: 'Registration successful' }
  } catch (error) {
    return { success: false, error: 'Failed to register' }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to logout' }
  }
}
