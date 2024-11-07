<template>
    <div class="error-page bg-nude-6 w-full h-[80vh] flex flex-col justify-center items-center px-4">
        <p class="text-9xl font-bold">404</p>
        <h1 class="text-clamp-2xl text-center" >No hemos podido encontrar la página que buscas.</h1>
        <p class="text-center max-w-[50ch] lg:max-w-[60ch] text-pretty">No te preocupes, tenemos un montón de contenido que te puede interesar. Navega a
            través de nuestro menú o vuelve a la página de inicio. </p>
        <ElementsButton
            class="py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-xl cursor-pointer"
            @click="handleError">Ir a Clinicaegos</ElementsButton>
    </div>
</template>

<script setup>
import { useError, clearError } from 'nuxt/app';

const error = useError()

useHead(() => ({
    status: 404,
    title: "Página no encontrada",
}));

const handleError = () => {
    clearError({
        redirect: '/',
    });
};
</script>
