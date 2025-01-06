"use client"

import { RegisterForm } from "@/components/register-user"
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
            </div>
            Finance Inc.
          </a>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 size-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
