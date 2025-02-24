import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // เพิ่มการใช้งาน Tailwind Vite plugin

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(), // ใช้ Tailwind Vite plugin
    ],
});
