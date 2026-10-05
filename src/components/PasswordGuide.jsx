// Barra y lista que indican si la contraseña ya cumple cada regla.
import { passwordRules } from "../password/rules"
import "../styles/password.css"

function PasswordGuide({ value }) {
  const rules = passwordRules(value)
  const done = rules.filter((rule) => rule.ok).length
  const ready = done === rules.length
  return (
    <div className="guide">
      <div className="meter" aria-hidden="true">
        <span className={ready ? "ready" : "weak"} style={{ width: `${(done / rules.length) * 100}%` }} />
      </div>
      <ul>
        {rules.map((rule) => (
          <li key={rule.id} className={rule.ok ? "ok" : ""}>{rule.ok ? "Listo" : "Falta"}: {rule.label}</li>
        ))}
      </ul>
    </div>
  )
}

export default PasswordGuide
