<template>
    <li class="logros">
        <div class="mejorValorada logros__icon">
            <img class="google-icon" src="/images/icons/google.svg"
                alt="Clínica mejor valorada en google" width="32" height="32" />
            <span>Somos la clínica mejor<br>valorada en Google</span>
        </div>
        <div class="h-full w-px bg-gold-2"></div>
        <div class="operaciones logros__icon">
            <img class="laurel-iz" src="/images/icons/tremil.svg" alt="" width="60" height="24" />
            <span>pacientes intervenidos<br>al año</span>
        </div>
    </li>
</template>

<script setup>
import {ref, onMounted} from 'vue'
</script>

<style scoped>
.logros {
    @apply text-nude-8 bg-blue-1 rounded-xl text-clamp-xs hidden lg:flex justify-center items-center absolute bottom-6 w-fit h-20 px-6 py-3 gap-4;
}

.logros__icon {
    @apply flex justify-center items-center gap-2 w-1/2
}

.logros__icon span {
    @apply !text-nude-8 after:content-none before:!content-none mt-3 text-balance;
}
</style>
