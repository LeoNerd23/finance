"use client"

import { useUser } from "@/context/UserContext"
import { withAuth } from "@/hoc/withAuth"

import { Button } from "@/components/ui/button"

function HomePage() {
  const { logout } = useUser()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1>Hello World!!!</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default withAuth(HomePage)
