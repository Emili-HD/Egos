<template>
    <div id="premios"class="premios-container flex items-stretch justify-center flex-wrap gap-4 p-8 lg:px-20 xl:px-32 xl:pb-32" data-anchor="premios">
        <h2 class="w-full text-center text-clamp-2xl">Empresas que avalan nuestra experiencia y confianza</h2>
        <div v-for="premio in premios" :key="premio.nombre"
            class="premio flex flex-col justify-between items-center p-6 rounded-xl overflow-hidden w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] [.tratamiento-113_&]:!border-vermell border border-current">
            <div class="max-w-[70%] aspect-square flex justify-center items-center mix-blend-multiply">
                <img 
                    loading="lazy"
                    :src="premio.imagen_premio" 
                    :alt="`Premio de ${premio.nombre}`" 
                />
            </div>
            <p class="text-center font-semibold">{{ premio.nombre }}</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { egosSettings } from '@/composables/useApi.js';


const premios = ref([]);

const fetchPremios = async () => {
    try {
        const data = await egosSettings('premios');
        premios.value = data.premios;
    } catch (error) {
        console.error('Error fetching premios:', error);
    }
};

onMounted(fetchPremios);
</script>

<style lang="scss" scoped>

</style>
