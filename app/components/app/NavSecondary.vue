<template>
    <div class="nav-secondary bg-crema min-w-fit p-1 rounded-tr-2xl rounded-br-2xl hidden xl:flex  h-full gap-2">
        <a class="button pedircita [html:not(.blackfriday)_&]:bg-blue-1 [.blackfriday_&]:bg-black text-nude-8 min-w-28 text-center flex flex-col justify-center items-center border-none rounded-xl p-0 w-full h-full z-2"
            href="#formulario" >
            Pide Cita
        </a>
        <a v-if="showPresupuestoLink" class="button gold [html:not(.blackfriday)_&]:bg-blue-1 [.blackfriday_&]:bg-black text-nude-8 min-w-28 text-center flex flex-col justify-center items-center border-none rounded-xl p-0 w-full h-full z-2 leading-none"
            href="#presupuesto" >
            Calcula tu presupuesto
        </a>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';


// const { $lenis: lenis } = useNuxtApp();
const showPresupuestoLink = ref(false);

// const handleClick = () => {
//     lenis.scrollTo('#formulario', { offset: -20 });
// }

// const pressu = () => {
//     lenis.scrollTo('#presupuesto', { offset: -280 });
// }

const checkPresupuestoLink = () => {
    showPresupuestoLink.value = !!document.getElementById('presupuesto');
}

onMounted(() => {
    checkPresupuestoLink(); // Initial check in case #presupuesto is already in the DOM

    const observer = new MutationObserver(() => {
        checkPresupuestoLink();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

onBeforeUnmount(() => {
    observer.disconnect();
});
</script>
