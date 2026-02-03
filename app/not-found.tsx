import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-4 max-w-md">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
        
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/login">
          <Button className="w-full">
            Go to login
          </Button>
        </Link>
      </div>
    </div>
  )
}
