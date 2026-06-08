tailwind.config = {
    theme: {
        extend: {
            animation: {
                blob: "blob 9s infinite",
                'pulse-slow': "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(40px, -60px) scale(1.15)" },
                    "66%": { transform: "translate(-30px, 35px) scale(0.85)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
            },
        },
    },
}