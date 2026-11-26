import fs from "fs"
import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function hvacSyncPlugin() {
  const syncFile = path.resolve(__dirname, '.hvac-sync.json')
  let memoryState = null

  const readState = () => {
    if (memoryState) return memoryState
    try {
      if (fs.existsSync(syncFile)) {
        memoryState = JSON.parse(fs.readFileSync(syncFile, 'utf-8'))
        return memoryState
      }
    } catch {
      // ignore read errors
    }
    return null
  }

  const writeState = (next) => {
    memoryState = next
    try {
      fs.writeFileSync(syncFile, JSON.stringify(next, null, 2), 'utf-8')
    } catch {
      // ignore write errors
    }
  }

  return {
    name: 'hvac-sync-api',
    configureServer(server) {
      server.middlewares.use('/api/hvac-sync', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Content-Type', 'application/json')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method === 'GET') {
          const data = readState()
          res.statusCode = 200
          res.end(JSON.stringify({ ok: true, data }))
          return
        }

        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const incoming = JSON.parse(body || '{}')
              const current = readState() || {}
              const merged = {
                ...current,
                ...incoming,
                updatedAt: Date.now(),
              }
              writeState(merged)
              res.statusCode = 200
              res.end(JSON.stringify({ ok: true, data: merged }))
            } catch {
              res.statusCode = 400
              res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }))
            }
          })
          return
        }

        res.statusCode = 405
        res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), hvacSyncPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: false
  }
})
