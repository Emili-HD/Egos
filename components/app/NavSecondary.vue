<template>
    <div class="nav-secondary bg-white min-w-28 p-1 rounded-tr-2xl rounded-br-2xl hidden xl:block min-w-sreen/25 h-full">
        <a class="button pedircita bg-blue-1 text-nude-8 text-center flex flex-col justify-center items-center border-none rounded-xl p-0 w-full h-full z-2"
            href="#formulario" @click.prevent="handleClick">
            Pide Cita
        </a>
    </div>
</template>

<script setup>
    const { $lenis: lenis } = useNuxtApp();
    const handleClick = () => {
        lenis.scrollTo('#formulario', { offset: -20 });
    }
</script>

