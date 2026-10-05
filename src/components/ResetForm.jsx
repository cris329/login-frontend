import { useState } from "react"
import { passwordReady } from "../password/rules"
import Fields from "./Fields"
import PasswordGuide from "./PasswordGuide"
import { RESET_FIELDS } from "../config/loginConfig"

function ResetForm({ values, busy, onChange, onSubmit }) {
  const [tried, setTried] = useState(false)
  const codeError = tried && !/^\d{6}$/.test((values.code || "").replace(/\D/g, ""))
    ? "El código debe tener 6 números."
    : ""
  function submit(event) {
    event.preventDefault()
    setTried(true)
    if (!/^\d{6}$/.test((values.code || "").replace(/\D/g, "")) || !passwordReady(values.password)) return
    onSubmit(event)
  }
  return (
    <form onSubmit={submit} noValidate>
      <p className="help">Pega el código de 6 dígitos y escribe una contraseña que cumpla la lista.</p>
      <Fields fields={RESET_FIELDS} values={values} errors={{ code: codeError }} onChange={onChange} prefix="reset" />
      <PasswordGuide value={values.password} />
      <button type="submit" disabled={busy}>Guardar contraseña</button>
    </form>
  )
}

export default ResetForm
