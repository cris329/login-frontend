// Antes de compilar, deja en public/env.js la URL de la API (API_URL).
import { writeFileSync } from "node:fs"

const published = "https://login-backend-production-2e49.up.railway.app/api/v1"
const url = process.env.API_URL || (process.env.VERCEL ? published : "")
writeFileSync("public/env.js", "window.LOGIN_API=" + JSON.stringify(url) + ";\n")
