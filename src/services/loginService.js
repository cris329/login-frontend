// Solicitudes HTTP al backend: entrar, registrarse, pedir el código y renovar la sesión.
import { apiBase } from "../config/loginConfig"

export async function post(path, body) {
  const response = await fetch(apiBase() + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const payload = await response.json().catch(() => ({}))
  return { ok: response.ok, error: payload.error || "", token: payload.token || "", wait: payload.wait || 0 }
}

export async function renewSession(token) {
  const response = await fetch(apiBase() + "/sesion", {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
  })
  const payload = await response.json().catch(() => ({}))
  return { ok: response.ok && !!payload.token, token: payload.token || "" }
}
