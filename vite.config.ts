import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 8081,
        strictPort: true,
        host: true,
        allowedHosts: [
            'stirred-llama-social.ngrok-free.app'
        ],
    }
})
