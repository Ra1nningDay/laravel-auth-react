import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // ใช้สำหรับการตั้งค่า alias ถ้าจำเป็น

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // ตั้งค่า alias (ไม่จำเป็น)
        },
    },
    css: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
});
