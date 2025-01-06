"use-client"

import { ThemeToggle } from "@/components/theme-toggle"

export default function VerifyHeader() {
  return (
    <div className="flex h-12 items-center justify-between px-8">
      <a href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
            </div>
            Finance Inc.
      </a>
      <ThemeToggle />
    </div>
  )
}
