import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'k8s-threetie-mainlb-c0d4aec13e-711236200.ap-south-1.elb.amazonaws.com',
      'localhost',
      '127.0.0.1'
    ]
  }
})

