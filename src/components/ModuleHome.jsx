// Pantalla completa de módulos. Sustituye al acceso cuando la sesión está abierta.
import { useEffect, useState } from "react"
import { MODULES } from "../modules/catalog"
import "../styles/modules.css"

function ModuleHome({ onLeave }) {
  const [openId, setOpenId] = useState(null)
  const open = MODULES.find((item) => item.id === openId)

  useEffect(() => {
    document.title = open ? open.title : "Módulos"
    return () => {
      document.title = "Acceso"
    }
  }, [open])

  if (open) {
    return (
      <section className="home">
        <header className="bar">
          <button type="button" className="text" onClick={() => setOpenId(null)}>Módulos</button>
          <h1>{open.title}</h1>
        </header>
        <article className="sheet">
          <p>{open.text}</p>
        </article>
      </section>
    )
  }

  return (
    <section className="home">
      <header className="bar">
        <h1>Módulos</h1>
        <button type="button" className="exit" onClick={onLeave}>Salir</button>
      </header>
      <div className="modules">
        {MODULES.map((item) => (
          <button type="button" key={item.id} onClick={() => setOpenId(item.id)}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default ModuleHome
