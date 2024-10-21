export default defineNuxtRouteMiddleware((to, from) => {
    // Obtener el fullPath de la ruta
    const fullPath = to.fullPath;
    // console.log('Middleware activado - FullPath:', fullPath);

    // Comprobar si el fullPath contiene '/http', lo cual es un indicativo de URL malformada
    if (fullPath.includes('/http')) {
        return navigateTo('/error');
    }
});
