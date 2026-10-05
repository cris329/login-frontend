// Revisa el registro y señala el campo que está mal.
import { passwordReady } from "../password/rules"

const namePattern = /^[\p{L} ]{2,40}$/u
const correoPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/
const needContact = "Coloca un celular o un correo para recuperar la cuenta."

function digits(value) {
  return (value || "").replace(/\D/g, "")
}

export function checkRegister(values) {
  const errors = {}
  const phone = digits(values.phone)
  const correo = (values.correo || "").trim().toLowerCase()
  if (!namePattern.test((values.first_name || "").trim())) {
    errors.first_name = "El primer nombre debe tener solo letras."
  }
  if (!namePattern.test((values.last_name || "").trim())) {
    errors.last_name = "El primer apellido debe tener solo letras."
  }
  if (!/^\d{5,15}$/.test(digits(values.identification))) {
    errors.identification = "La identificación debe tener entre 5 y 15 números."
  }
  if (!phone && !correo) {
    errors.phone = needContact
    errors.correo = needContact
  }
  if (values.phone && !/^\d{7,15}$/.test(phone)) {
    errors.phone = "El celular debe tener solo números, entre 7 y 15."
  }
  if (correo && !correoPattern.test(correo)) {
    errors.correo = "El correo debe incluir un @ y un dominio, como nombre@correo.com."
  }
  if (!passwordReady(values.password)) errors.password = "incomplete"
  return errors
}

export function shownErrors(values, tried) {
  const all = checkRegister(values)
  if (tried) {
    const visible = { ...all }
    delete visible.password
    return visible
  }
  const live = {}
  if (values.correo && all.correo) live.correo = all.correo
  if (values.phone && all.phone && all.phone !== needContact) live.phone = all.phone
  return live
}
