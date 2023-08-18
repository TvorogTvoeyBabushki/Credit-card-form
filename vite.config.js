import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/Credit-card-form',
	plugins: [react()],
	server: {
		port: 7000,
		open: true
	}
})
