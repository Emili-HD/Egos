// plugins/viewport-height.client.js

export default defineNuxtPlugin(() => {
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Ejecuta la función inicialmente
    setViewportHeight();

    // Añade el event listener
    window.addEventListener('resize', setViewportHeight);

    // Opcional: Remover el event listener cuando la página se recarga o cierra
    window.addEventListener('beforeunload', () => {
        window.removeEventListener('resize', setViewportHeight);
    });
});
