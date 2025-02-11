// middleware/cleanQueryParams.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return; // Evita ejecutarse en el servidor

    console.log(`[Middleware] Ejecutado con: ${to.fullPath}`);

    let cleanPath = to.fullPath;

    // 1️⃣ Eliminar query params si existen
    if (cleanPath.includes('?')) {
        [cleanPath] = cleanPath.split('?');
    }

    // 2️⃣ Detectar cualquier "/https:/" en la URL y eliminar todo después de eso
    const duplicateIndex = cleanPath.indexOf('/https:/');
    if (duplicateIndex !== -1) {
        cleanPath = cleanPath.substring(0, duplicateIndex); // Corta la URL antes del segundo "https:/"
    }

    // 3️⃣ Si la URL ha cambiado, forzar la redirección
    if (cleanPath !== to.fullPath) {
        console.log(`[Middleware] Redirigiendo a: ${cleanPath}`);

        return navigateTo(cleanPath, {
            replace: true, // Evita guardar la URL incorrecta en el historial
            redirectCode: 301 // Redirección permanente
        });
    }

    // 2️⃣ Detectar cualquier "/https:/" en la URL y eliminar todo después de eso
    const invalidIndex = cleanPath.indexOf('/%E2%80%9Dhttps:/www.clinicaegos.com/%E2%80%9D/');
    if (invalidIndex !== -1) {
        cleanPath = cleanPath.substring(0, invalidIndex); // Corta la URL antes del segundo "https:/"
    }

    // 3️⃣ Si la URL ha cambiado, forzar la redirección
    if (cleanPath !== to.fullPath) {
        console.log(`[Middleware] Redirigiendo a: ${cleanPath}`);

        return navigateTo(cleanPath, {
            replace: true, // Evita guardar la URL incorrecta en el historial
            redirectCode: 301 // Redirección permanente
        });
    }
});
