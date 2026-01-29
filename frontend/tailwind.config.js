/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: "#0f172a", // Slate 900
                    card: "#1e293b", // Slate 800
                    highlight: "#334155", // Slate 700
                    text: "#f8fafc", // Slate 50
                    muted: "#94a3b8", // Slate 400
                    accent: "#38bdf8", // Sky 400
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
