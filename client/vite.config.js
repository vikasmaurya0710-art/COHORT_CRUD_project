import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "")

  if (command === "build" && process.env.VERCEL === "1") {
    let backendUrl
    try {
      backendUrl = new URL(env.VITE_API_URL)
    } catch {
      throw new Error(
        "Set VITE_API_URL in the Vercel frontend project to the deployed backend URL, for example https://your-backend.vercel.app/api."
      )
    }

    if (!["http:", "https:"].includes(backendUrl.protocol)) {
      throw new Error("VITE_API_URL must use HTTP or HTTPS.")
    }
  }

  return {
    plugins: [react(),tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_DEV_API_PROXY_TARGET || "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  }
})
