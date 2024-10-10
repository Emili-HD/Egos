const fontSize = 'tailwindcss/fontSize'
const fontFamily = 'tailwindcss/typography'
const colors = 'tailwindcss/colors'
const keyframes = 'tailwindcss/keyframes'

/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
            },
            gridColumnStart: {
                '13': '13',
                '14': '14',
                '15': '15',
                '16': '16',
                '17': '17',
            },
            gridColumnEnd: {
                '13': '13',
                '14': '14',
                '15': '15',
                '16': '16',
                '17': '17',
            },
            backgroundImage: {
                'gold-gradient-text': "linear-gradient(-35deg, #d0c8ba, #908057, #d0c8ba, #908057, #d0c8ba)",
                // 'gold-gradient-text': "linear-gradient(to bottom right, #dcc376 0%, #c2a561 17%, #a6854a 40%, #926f3a 62%, #866130 82%, #825c2d 100%)",
            },
            colors: {
                'blue-1': '#1c2c44',
                'blue-2': '#223552',
                'blue-3': '#273e60',
                'blue-4': '#2d476e',
                'blue-5': '#33507c',
                'blue-6': '#395989',
                'gold-1': '#CCB780',
                'gold-2': '#908057',
                'gold-3': '#6e5922',
                'nude-1': '#c0b5a3',
                'nude-2': '#c8beaf',
                'nude-3': '#d0c8ba',
                'nude-4': '#d8d1c6',
                'nude-5': '#e0dad2',
                'nude-6': '#e8e4dd',
                'nude-7': '#f0ede9',
                'nude-8': '#f8f7f4',
                'dark-1': '#181818',
                'dark-2': '#222222',
                'red-1': '#942f2f',
                'red-2': '#862a2a',
            },
            backgroundColor: {
                'bg-blue-1': '#1c2c44',
                'bg-blue-2': '#223552',
                'bg-blue-3': '#273e60',
                'bg-blue-4': '#2d476e',
                'bg-blue-5': '#33507c',
                'bg-blue-6': '#395989',
                'bg-gold-1': '#CCB780',
                'bg-gold-2': '#908057',
                'bg-gold-3': '#6e5922',
                'bg-nude-1': '#c0b5a3',
                'bg-nude-2': '#c8beaf',
                'bg-nude-3': '#d0c8ba',
                'bg-nude-4': '#d8d1c6',
                'bg-nude-5': '#e0dad2',
                'bg-nude-6': '#e8e4dd',
                'bg-nude-7': '#f0ede9',
                'bg-nude-8': '#f8f7f4',
            },
            fontSize: {
                'clamp-2xs': "clamp(0.65rem, 0.6vw, 0.8rem)",
                'clamp-xs': "clamp(0.75rem, 0.7vw, 0.9rem)",
                'clamp-sm': "clamp(0.825rem, 0.95vw, 1rem)",
                'clamp-base': "clamp(.9rem, 1.2vw, 1.3rem)",
                'clamp-lg': "clamp(1.3rem, 1.6vw, 1.8rem)",
                'clamp-xl': "clamp(1.6rem, 1.9vw, 2.1rem)",
                'clamp-2xl': "clamp(1.9rem, 2.2vw, 2.4rem)",
                'clamp-3xl': "clamp(2.2rem, 2.5vw, 2.7rem)",
                'clamp-4xl': "clamp(2.5rem, 2.8vw, 3rem)",
                'clamp-5xl': "clamp(2.8rem, 3.1vw, 3.3rem)",
                'clamp-6xl': "clamp(3.1rem, 3.4vw, 3.7rem)",
            },
            fontFamily: {
                nunito: ['Nunito Sans', 'sans-serif'],
                lora: ['Lora', 'serif'],
            },
            spacing: {
                'screen/95': '95vh',
                'screen/90': '90vh',
                'screen/85': '85vh',
                'screen/80': '80vh',
                'screen/75': '75vh',
                'screen/70': '70vh',
                'screen/65': '65vh',
                'screen/60': '60vh',
                'screen/55': '55vh',
                'screen/50': '50vh',
                'screen/45': '45vh',
                'screen/40': '40vh',
                'screen/35': '35vh',
                'screen/30': '30vh',
                'screen/25': '25vh',
                'screen/20': '20vh',
                'screen/15': '15vh',
                'screen/10': '10vh',
                'screen/5': '5vh',
            },
            keyframes: {
                gradient: {
                    '0%': { backgroundPosition: '0 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0 50%)' },
                },
            },
            animation: {
                'gradient': 'gradient 7s ease infinite',
            },
            screens: {
                'max-2xl': { 'max': '1535px' },
                'max-xl': { 'max': '1279px' },
                'max-lg': { 'max': '1023px' },
                'max-md': { 'max': '767px' },
                'max-sm': { 'max': '639px' },
            },
        }
    },
    plugins: [
        // require('@tailwindcss/fontSize'),
        // require('@tailwindcss/typography'),
        // require('@tailwindcss/keyframes'),
    ],
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ]
}


