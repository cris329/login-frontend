// Coordina la pantalla y guarda en memoria el formulario, el mensaje y la espera del código.
import { useEffect, useState } from "react"
import AccessView from "./components/AccessView"
import ModuleHome from "./components/ModuleHome"
import { emptyLogin, emptyRecover, emptyRegister, emptyReset, MAIL_SENDER } from "./config/loginConfig"
import { post, renewSession } from "./services/loginService"

function App() {
  const [screen, setScreen] = useState("login")
  const [message, setMessage] = useState(null)
  const [busy, setBusy] = useState(false)
  const [waitLeft, setWaitLeft] = useState(0)
  const [identification, setIdentification] = useState("")
  const [login, setLogin] = useState(emptyLogin())
  const [account, setAccount] = useState(emptyRegister())
  const [recover, setRecover] = useState(emptyRecover())
  const [reset, setReset] = useState(emptyReset())
  useEffect(() => {
    if (waitLeft <= 0) return undefined
    const timer = setInterval(() => setWaitLeft((left) => (left <= 1 ? 0 : left - 1)), 1000)
    return () => clearInterval(timer)
  }, [waitLeft === 0])

  useEffect(() => {
    if (screen !== "session") return undefined
    let stop = false
    const beat = async () => {
      const token = sessionStorage.getItem("login_token")
      if (!token || stop) return
      const result = await renewSession(token)
      if (stop) return
      if (result.ok) {
        sessionStorage.setItem("login_token", result.token)
        return
      }
      sessionStorage.removeItem("login_token")
      setScreen("login")
      setMessage({ type: "error", text: "La sesión venció" })
    }
    beat()
    const timer = setInterval(beat, 60000)
    return () => {
      stop = true
      clearInterval(timer)
    }
  }, [screen])
  function show(next) {
    setScreen(next)
    setMessage(null)
  }
  function edit(setter) {
    return (event) => {
      const { name, value } = event.target
      setter((current) => ({ ...current, [name]: value }))
    }
  }
  async function onLogin(event) {
    event.preventDefault()
    setBusy(true)
    const result = await post("/login", login).catch(() => ({ ok: false }))
    setBusy(false)
    if (!result.ok || !result.token) {
      setMessage({ type: "error", text: "Credenciales inválidas" })
      return
    }
    sessionStorage.setItem("login_token", result.token)
    setMessage(null)
    setScreen("session")
  }
  async function onRegister(event) {
    event.preventDefault()
    setBusy(true)
    const result = await post("/registro", account).catch(() => ({ ok: false, error: "Revisa los datos" }))
    setBusy(false)
    if (!result.ok) {
      setMessage({ type: "error", text: result.error || "Revisa los datos" })
      return
    }
    setAccount(emptyRegister())
    setScreen("login")
    setMessage({ type: "ok", text: "Usuario registrado" })
  }
  async function sendCode(method) {
    if (waitLeft > 0) return
    const id = recover.identification
    setIdentification(id)
    sessionStorage.setItem("login_id", id)
    setBusy(true)
    const result = await post("/recuperar", { identification: id, method }).catch(() => ({ ok: false }))
    setBusy(false)
    if (result.wait) setWaitLeft(result.wait)
    if (!result.ok) {
      setMessage({ type: "error", text: result.error || "No se pudo enviar el código" })
      return
    }
    setScreen("reset")
    const where = method === "sms" ? "al celular" : "desde " + MAIL_SENDER
    setMessage({ type: "ok", text: "Código enviado " + where + ". Tarda cerca de 1 minuto. No pidas otro hasta que el tiempo llegue a cero." })
  }
  async function onReset(event) {
    event.preventDefault()
    const id = identification || sessionStorage.getItem("login_id") || ""
    setBusy(true)
    const result = await post("/recuperar/codigo", {
      identification: id, code: reset.code, password: reset.password,
    }).catch(() => ({ ok: false }))
    setBusy(false)
    if (!result.ok) {
      setMessage({ type: "error", text: result.error || "Código inválido" })
      return
    }
    setReset(emptyReset())
    setScreen("login")
    setMessage({ type: "ok", text: "Contraseña actualizada. Ya puedes iniciar sesión." })
  }

  function leaveSession() {
    sessionStorage.removeItem("login_token")
    setLogin(emptyLogin())
    setMessage(null)
    setScreen("login")
  }

  if (screen === "session") return <ModuleHome onLeave={leaveSession} />

  const editors = { login: setLogin, register: setAccount, recover: setRecover, reset: setReset }
  return (
    <AccessView
      screen={screen} message={message} waitLeft={waitLeft} busy={busy}
      login={login} account={account} recover={recover} reset={reset}
      onShow={show} onEdit={(key) => edit(editors[key])}
      onLogin={onLogin} onRegister={onRegister} onSend={sendCode} onReset={onReset}
    />
  )
}

export default App
