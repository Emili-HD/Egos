// plugins/viewport-height.client.js
export default defineNuxtPlugin(() => {
    const setViewportHeight = () => {
        // Calcular la altura de la ventana en píxeles dividida entre 100
        const vh = window.innerHeight * 0.01;
        // Asignar el valor a la variable CSS en la etiqueta <html>
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Ejecutar la función inicialmente
    setViewportHeight();

    // Recalcular cuando se redimensiona la ventana
    window.addEventListener('resize', setViewportHeight);

    // Eliminar el evento al destruir el componente
    onUnmounted(() => {
        window.removeEventListener('resize', setViewportHeight);
    });
});
