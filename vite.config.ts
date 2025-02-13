import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3006,
        strictPort: true,
        host: true,
        allowedHosts: [
            'stirred-llama-social.ngrok-free.app'
        ],
        proxy: {
            '/api': {
                target: 'http://91.84.100.160:3000', // URL вашего бэкенда
                changeOrigin: true,
                secure: false,
            },
        },
    }
})
