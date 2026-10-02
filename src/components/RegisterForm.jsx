import Fields from "./Fields"
import { REGISTER_FIELDS } from "../config/loginConfig"

function RegisterForm({ values, busy, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Fields fields={REGISTER_FIELDS} values={values} onChange={onChange} prefix="register" />
      <button type="submit" disabled={busy}>Crear cuenta</button>
    </form>
  )
}

export default RegisterForm
