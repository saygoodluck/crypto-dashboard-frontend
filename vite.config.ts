import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        allowedHosts: [
            '91.84.100.160',
            '6c74-2a02-a311-df-6b00-98bd-5bf9-e4c3-6902.ngrok-free.app'
        ],
    }
})
