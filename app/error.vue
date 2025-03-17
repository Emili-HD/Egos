<template>
    <AppHeader />
    <div
        class="error-page bg-nude-6 w-full min-h-screen flex flex-col lg:flex-row justify-between items-center px-4 pt-28">
        <div>
            <p class="text-[40vw] lg:text-[30vw] font-bold leading-none tracking-[-0.1em] max-w-1/2">404</p>
        </div>
        <div class="px-8 lg:px-40 text-center max-w-1/2">
            <h1 class="text-clamp-2xl lg:text-clamp-4xl text-center leading-tight">
                Ups... ¡Parece que esta página necesita un retoque!
            </h1>
            <p class="text-center text-pretty">
                {{ error?.statusCode === 404 ? 'No encontramos la página que buscas.' : 'Ha ocurrido un error inesperado.' }}
            </p>
            <ElementsButton class="py-1 px-6 mb-6 bg-gold-2 text-nude-8 text-center uppercase rounded-xl cursor-pointer"
                @click="handleError">
                Ir a la página principal
            </ElementsButton>
            <p class="text-lg text-center text-pretty">
                Porque al igual que en la cirugía plástica, estamos aquí para que todo luzca justo como debe ser.
            </p>
        </div>
    </div>
</template>

<script setup>
    import { clearError } from 'nuxt/app';

    // Recibir el error como propiedad
    defineProps({
        error: Object
    });

    useHead({
        title: "Página no encontrada",
    });

    // Función para limpiar el error y redirigir
    const handleError = () => {
        clearError();
        navigateTo('/');
    };
</script>
