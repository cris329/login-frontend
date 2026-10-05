import Fields from "./Fields"
import { MAIL_SENDER, RECOVER_FIELDS } from "../config/loginConfig"

function RecoverForm({ values, busy, waitLeft, onChange, onSend, onBack }) {
  const locked = busy || waitLeft > 0
  return (
    <form noValidate>
      <p className="help">
        El SMS llega al celular. El correo sale desde {MAIL_SENDER}. Tarda cerca de 1 minuto.
      </p>
      <Fields fields={RECOVER_FIELDS} values={values} onChange={onChange} prefix="recover" />
      <div className="choices">
        <button type="button" disabled={locked} onClick={() => onSend("sms")}>Enviar por SMS</button>
        <button type="button" className="ghost" disabled={locked} onClick={() => onSend("correo")}>Enviar por correo</button>
      </div>
      <button type="button" className="link" disabled={busy} onClick={onBack}>Volver</button>
    </form>
  )
}

export default RecoverForm
