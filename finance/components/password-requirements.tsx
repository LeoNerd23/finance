import { Check, X } from 'lucide-react'

interface PasswordRequirementProps {
  label: string
  meets: boolean
}

function PasswordRequirement({ label, meets }: PasswordRequirementProps) {
  return (
    <div className={`flex items-center gap-2 text-sm ${meets ? 'text-green-600' : 'text-red-600'}`}>
      {meets ? <Check size={16} /> : <X size={16} />}
      <span>{label}</span>
    </div>
  )
}

interface PasswordRequirementsProps {
  password: string
  isValid: boolean
}

export function PasswordRequirements({ password, isValid }: PasswordRequirementsProps) {
  const requirements = [
    { label: "Deve conter pelo menos uma letra maiúscula", regex: /[A-Z]/ },
    { label: "Deve conter pelo menos uma letra minúscula", regex: /[a-z]/ },
    { label: "Deve conter pelo menos um número", regex: /\d/ },
    { label: "Deve conter pelo menos um caractere especial", regex: /[\W_]/ },
    { label: "Deve conter pelo menos 6 caracteres", regex: /.{6,}/ },
  ]

  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req, index) => (
        <PasswordRequirement
          key={index}
          label={req.label}
          meets={req.regex.test(password)}
        />
      ))}
      <div className={`text-sm font-medium ${isValid ? 'text-green-600' : 'text-red-600'}`}>
      </div>
    </div>
  )
}

