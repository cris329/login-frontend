// Reglas visibles mientras se escribe una contraseña nueva.

const RULES = [
  { id: "len", label: "8 caracteres o más", ok: (value) => value.length >= 8 && value.length <= 72 },
  { id: "upper", label: "Una letra mayúscula", ok: (value) => /[A-Z]/.test(value) },
  { id: "lower", label: "Una letra minúscula", ok: (value) => /[a-z]/.test(value) },
  { id: "digit", label: "Un número", ok: (value) => /\d/.test(value) },
  { id: "sign", label: "Un signo, como ! o #", ok: (value) => /[^A-Za-z0-9]/.test(value) },
]

export function passwordRules(value) {
  const text = value || ""
  return RULES.map((rule) => ({ id: rule.id, label: rule.label, ok: rule.ok(text) }))
}

export function passwordReady(value) {
  return passwordRules(value).every((rule) => rule.ok)
}
