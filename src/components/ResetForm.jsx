import Fields from "./Fields"
import { RESET_FIELDS } from "../config/loginConfig"

function ResetForm({ values, busy, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="help">Pega el código de 6 dígitos y una contraseña de 8 o más.</p>
      <Fields fields={RESET_FIELDS} values={values} onChange={onChange} prefix="reset" />
      <button type="submit" disabled={busy}>Guardar contraseña</button>
    </form>
  )
}

export default ResetForm
