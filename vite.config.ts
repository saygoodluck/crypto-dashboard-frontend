import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3006,
        strictPort: true,
        host: true,
        allowedHosts: ['crypto-dashboard.site']
    }
})
