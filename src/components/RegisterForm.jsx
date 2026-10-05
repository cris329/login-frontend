import { useState } from "react"
import { checkRegister, shownErrors } from "../account/check"
import Fields from "./Fields"
import PasswordGuide from "./PasswordGuide"
import { REGISTER_FIELDS } from "../config/loginConfig"

function RegisterForm({ values, busy, onChange, onSubmit }) {
  const [tried, setTried] = useState(false)
  const errors = shownErrors(values, tried)
  function submit(event) {
    event.preventDefault()
    setTried(true)
    if (Object.keys(checkRegister(values)).length) return
    onSubmit(event)
  }
  return (
    <form onSubmit={submit} noValidate>
      <p className="help">Para recuperar la cuenta coloca un celular o un correo.</p>
      <Fields fields={REGISTER_FIELDS} values={values} errors={errors} onChange={onChange} prefix="register" />
      <PasswordGuide value={values.password} />
      <button type="submit" disabled={busy}>Crear cuenta</button>
    </form>
  )
}

export default RegisterForm
