/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                civic: {
                    primary: '#1A56DB',
                    primaryDark: '#1E429F',
                    accent: '#E02424',
                    success: '#057A55',
                    warning: '#C27803',
                    background: '#F9FAFB',
                    surface: '#FFFFFF',
                    border: '#E5E7EB',
                    textPrimary: '#111928',
                    textSecondary: '#6B7280',
                    textMuted: '#9CA3AF',
                    saffron: '#FF9933'
                }
            },
            fontFamily: {
                sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
                'card-hover': '0 4px 16px rgba(0,0,0,0.1)',
                'modal': '0 20px 60px rgba(0,0,0,0.18)',
                'sticky-nav': '0 1px 0 #E5E7EB',
            },
            borderRadius: {
                'btn': '8px',
                'card': '12px',
                'badge': '999px',
                'modal': '16px',
                'input': '8px',
            }
        },
    },
    plugins: [],
};
