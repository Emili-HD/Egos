<template>
    <div class="influencers-container flex items-start justify-center flex-wrap gap-4 p-12 lg:px-32 lg:pb-32">
        <h2 class="w-full text-center"><a href="https://instagram.com/clinicaegos/" target="_blank" rel="noopener noreferrer">Nuestras pacientes de @clinicaegos</a></h2>
        <div v-for="influencer in influencers" :key="influencer.url_del_enlace"
            class="influencer bg-white rounded-xl overflow-hidden w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] xl:w-[calc(20%-1rem)] shadow-2xl">
            <a :href="influencer.url_del_enlace" target="_blank" rel="noopener noreferrer">
                <div class="flex gap-2 items-center justify-start p-4">
                    <img :src="influencer.icono_influencer" :alt="`Icono de ${influencer.texto_del_enlace}`"
                        width="32" height="32" class="rounded-full" />
                    <p class="mb-0">{{ influencer.texto_del_enlace }}</p>
                </div>
                <img 
                    loading="lazy"
                    :src="influencer.imagen_influencer" 
                    :alt="`Imagen de ${influencer.texto_del_enlace}`" 
                />
            </a>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { egosSettings } from '@/composables/useFetch.js';

const influencers = ref([]);

const fetchInfluencers = async () => {
    try {
        const data = await egosSettings('influencers');
        influencers.value = data.influencers;
    } catch (error) {
        console.error('Error fetching influencers:', error);
    }
};

onMounted(fetchInfluencers);
</script>
