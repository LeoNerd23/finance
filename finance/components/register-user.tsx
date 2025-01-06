"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordRequirements } from "./password-requirements"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    const isValid = emailRegex.test(newEmail)
    setIsEmailValid(isValid)
    setEmailError(isValid ? "" : "Por favor, insira um email válido")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setName: React.Dispatch<React.SetStateAction<string>>, setError: React.Dispatch<React.SetStateAction<string>>) => {
    const newName = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
    setName(newName)
    setError(newName.trim() ? "" : "Este campo é obrigatório")
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setIsPasswordValid(passwordRegex.test(newPassword))
  }

  const handlePasswordFocus = () => {
    setShowPasswordRequirements(true)
  }

  const handlePasswordBlur = () => {
    setShowPasswordRequirements(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEmailValid && firstName.trim() && lastName.trim() && isPasswordValid) {
      // Proceed with form submission
      console.log("Form submitted", { email, firstName, lastName, password })
    } else {
      console.log("Form validation failed")
      if (!firstName.trim()) setFirstNameError("Este campo é obrigatório")
      if (!lastName.trim()) setLastNameError("Este campo é obrigatório")
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-muted-foreground text-balance text-sm">
          Digite seu email e uma senha para realizar seu cadastro
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={handleEmailChange}
            className={cn(
              "transition-colors",
              !isEmailValid && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            required
            value={firstName}
            onChange={(e) => handleNameChange(e, setFirstName, setFirstNameError)}
            className={cn(
              "transition-colors",
              firstNameError && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {firstNameError && <p className="text-sm text-red-500">{firstNameError}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            required
            value={lastName}
            onChange={(e) => handleNameChange(e, setLastName, setLastNameError)}
            className={cn(
              "transition-colors",
              lastNameError && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {lastNameError && <p className="text-sm text-red-500">{lastNameError}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="*******"
            required
            value={password}
            onChange={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            className={cn(
              "transition-colors",
              !isPasswordValid && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {showPasswordRequirements && (
            <PasswordRequirements
              password={password}
              isValid={isPasswordValid}
            />
          )}
        </div>
        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
      </div>
      <div className="text-center text-sm">
        Já possui conta? {' '}
        <a href="/" className="underline underline-offset-4">
          Faça seu login
        </a>
      </div>
    </form>
  )
}

