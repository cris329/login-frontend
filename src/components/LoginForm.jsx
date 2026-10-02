import Fields from "./Fields"
import { LOGIN_FIELDS } from "../config/loginConfig"

function LoginForm({ values, busy, onChange, onSubmit, onForgot }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Fields fields={LOGIN_FIELDS} values={values} onChange={onChange} prefix="login" />
      <button type="submit" disabled={busy}>Entrar</button>
      <button type="button" className="link" disabled={busy} onClick={onForgot}>Olvidé mi contraseña</button>
    </form>
  )
}

export default LoginForm
