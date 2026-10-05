// Pantalla de acceso: entrar, registrarse y recuperar la contraseña.
import LoginForm from "./LoginForm"
import RecoverForm from "./RecoverForm"
import RegisterForm from "./RegisterForm"
import ResetForm from "./ResetForm"

function clock(seconds) {
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0")
}

function AccessView({ screen, message, waitLeft, busy, login, account, recover, reset, onShow, onEdit, onLogin, onRegister, onSend, onReset }) {
  const tabs = screen === "login" || screen === "register"
  return (
    <div className="scene">
      <aside className="intro">
        <p className="mark">Acceso</p>
        <h1>Entra con tu número de identificación</h1>
        <p>Si olvidas la contraseña, el código llega al celular o al correo.</p>
      </aside>
      <main className="panel">
        {tabs && (
          <div className="tabs">
            <button type="button" className={screen === "login" ? "active" : ""} disabled={busy} onClick={() => onShow("login")}>Iniciar sesión</button>
            <button type="button" className={screen === "register" ? "active" : ""} disabled={busy} onClick={() => onShow("register")}>Registro</button>
          </div>
        )}
        <p className={"message" + (message ? " " + message.type : "")} role="status">{message ? message.text : ""}</p>
        {waitLeft > 0 && <p className="wait">Puedes enviar otro código en {clock(waitLeft)}</p>}
        {screen === "login" && <LoginForm values={login} busy={busy} onChange={onEdit("login")} onSubmit={onLogin} onForgot={() => onShow("recover")} />}
        {screen === "register" && <RegisterForm values={account} busy={busy} onChange={onEdit("register")} onSubmit={onRegister} />}
        {screen === "recover" && <RecoverForm values={recover} busy={busy} waitLeft={waitLeft} onChange={onEdit("recover")} onSend={onSend} onBack={() => onShow("login")} />}
        {screen === "reset" && <ResetForm values={reset} busy={busy} onChange={onEdit("reset")} onSubmit={onReset} />}
      </main>
    </div>
  )
}

export default AccessView
