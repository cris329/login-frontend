// Campos, etiquetas y valores vacíos de cada formulario.

export const apiBase = () => "/api/v1"

export const MAIL_SENDER = "cj.deysdayr@12332201.brevosend.com"

export const LOGIN_FIELDS = [
  { name: "identification", label: "N° de identificación", inputMode: "numeric", autoComplete: "username" },
  { name: "password", label: "Contraseña", type: "password", autoComplete: "current-password" },
]

export const REGISTER_FIELDS = [
  { name: "first_name", label: "Primer nombre", autoComplete: "given-name", pair: "name" },
  { name: "last_name", label: "Primer apellido", autoComplete: "family-name", pair: "name" },
  { name: "identification", label: "N° de identificación", inputMode: "numeric" },
  { name: "phone", label: "Celular", optional: true, inputMode: "numeric", pair: "contact" },
  { name: "correo", label: "Correo", optional: true, autoComplete: "email", pair: "contact" },
  { name: "password", label: "Contraseña", type: "password", autoComplete: "new-password" },
]

export const RECOVER_FIELDS = [
  { name: "identification", label: "N° de identificación", inputMode: "numeric" },
]

export const RESET_FIELDS = [
  { name: "code", label: "Código", inputMode: "numeric", autoComplete: "one-time-code" },
  { name: "password", label: "Nueva contraseña", type: "password", autoComplete: "new-password" },
]

export const emptyLogin = () => ({ identification: "", password: "" })
export const emptyRegister = () => ({
  first_name: "", last_name: "", identification: "", phone: "", correo: "", password: "",
})
export const emptyRecover = () => ({ identification: "" })
export const emptyReset = () => ({ code: "", password: "" })
