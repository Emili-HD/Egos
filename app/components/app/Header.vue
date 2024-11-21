<template>
    <header class="egos-header fixed flex flex-col justify-start items-center z-[1000] max-h-vh/75 w-screen" id="site-header">
        <ElementsNotices />
        <div class="header-wrapper flex flex-row justify-between px-4 mt-2 w-full h-16">
            <AppHeaderBrand />
            <AppNavMobile v-if="$viewport.isLessThan('xl')"  :menuData="menuTratamientosData"/>
            <AppNavPrimary v-if="$viewport.isGreaterOrEquals('xl')" :menuData="menuTratamientosData" />
            <AppNavSecondary />
        </div>
    </header>
</template>

<script setup>
    const { $viewport } = useNuxtApp()

    const { data: menuTratamientosData } = await useAsyncData('menuTratamientos', async () => {
        const menuData = await getMenuTratamientos();
        return menuData;
    });
</script>
