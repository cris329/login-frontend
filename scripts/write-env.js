// Antes de compilar, deja en public/env.js la URL de la API (API_URL).
import { writeFileSync } from "node:fs"

const url = process.env.API_URL || ""
writeFileSync("public/env.js", "window.LOGIN_API=" + JSON.stringify(url) + ";\n")
