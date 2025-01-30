<template>
    <header class="egos-header fixed flex flex-col justify-start items-center z-[1000] max-h-vh/75 w-screen"
        id="site-header">
        <ElementsNotices />
        <div
            class="header-wrapper flex flex-row justify-between px-4 py-2 w-full h-14 lg:h-16 [html.blackfriday_&]:bg-[#181818] [html:not(.blackfriday)_&]:bg-blue-1">
            <AppHeaderBrand />

            <!-- Renderizar el error si ocurre -->
            <div v-if="menuError" class="text-red-500">Error cargando el menú: {{ menuError.message }}</div>

            <!-- Mostrar un loader mientras se cargan los datos -->
            <div v-else-if="isLoading"
                class="w-full flex justify-end items-center space-x-4 animate-pulse duration-200 px-4">
                <div v-for="n in 8" :key="n" class="bg-nude-8/25 h-4 w-28 rounded-full"></div>
            </div>

            <!-- Mostrar el menú cuando los datos estén disponibles -->
            <AppNavMobile v-else-if="$viewport.isLessThan('xl') && Object.keys(menuData).length > 0"
                :menuData="menuData" :isOpen="isOpen" @toggleMenu="toggleMenu" />
            <AppNavPrimary v-else-if="$viewport.isGreaterOrEquals('xl') && Object.keys(menuData).length > 0"
                :menuData="menuData" />
            <AppNavSecondary />
        </div>
    </header>
</template>

<script setup>
    import { useMenuStore } from '@/stores/menu';
    const { $viewport } = useNuxtApp();
    const error = useError(); 

    // Inicializamos el store
    const menuStore = useMenuStore();

    // Reacciones del store
    const { menuData, isOpen, isLoading, menuError } = storeToRefs(menuStore);

    // Métodos del store
    const toggleMenu = (open) => {
        if (menuStore.canOpen) {
            menuStore.toggleMenu(open);
            menuStore.disableOpenTemporarily();
        }
    };

    // Fetch inicial
    onMounted(async () => {
        try {
            await menuStore.fetchMenu();
        } catch (err) {
            // Capturar el error con useError y mostrarlo
            error.value = {
                statusCode: err.response?.status || 500,
                message: "No se pudo cargar el menú. Por favor, intenta nuevamente.",
            };
        }
    });
</script>
