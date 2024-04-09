<template>
    <div  class="col-[2/-2] bg-nude-6 p-8 rounded-2xl mb-12">
        <div v-for="review in reviews" :key="review.id" class="review">
            <h3>{{ review.title }}</h3>
            <p>{{ review.content }}</p>
            <p>Rating: {{ review.rating }}</p>
        </div>

        <h2>Agregar una reseña</h2>
        <form @submit.prevent="submitReview" class="flex flex-col gap-4">
            <div class="grupo flex flex-col lg:flex-row justify-between gap-4">
                <label for="titulo" class="flex flex-col w-full lg:w-3/4"><div>Título <sup class="text-red-800 font-normal">*</sup></div>
                    <input id="titulo" class="p-2 rounded-lg" v-model="newReview.title" type="text" placeholder="Título" />
                </label>
                <label for="valoracion" class="flex flex-col w-full lg:w-1/4"><div>Valoración <sup class="text-red-800 font-normal">*</sup></div>
                    <select v-model="newReview.rating" id="valoracion" class="p-2 rounded-lg" >
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </label>
            </div>
            <div class="grupo flex flex-col lg:flex-row justify-between gap-4">
                <label for="email" class="flex flex-col w-full lg:w-1/2"><div>Correo electrónico <sup class="text-red-800 font-normal">*</sup></div>
                    <input id="email" class="p-2 rounded-lg" v-model="newReview.email" type="email" placeholder="Correo Electrónico" />
                </label>
                <label for="name" class="flex flex-col w-full lg:w-1/2"><div>Nombre <sup class="text-red-800 font-normal">*</sup></div>
                    <input id="name" class="p-2 rounded-lg" v-model="newReview.name" type="text" placeholder="Nombre" />
                </label>
            </div>
            <label for="resena" class="flex flex-col"><div>Reseña <sup class="text-red-800 font-normal">*</sup></div>
                <textarea id="resena" class="p-2 rounded-lg min-h-32" v-model="newReview.content" placeholder="Reseña"></textarea>
            </label>
            <button class="button bg-blue-6 text-nude-8 mb-0 px-4 py-4 self-end flex justify-center items-center rounded-xl leading-3" type="submit">Enviar Reseña</button>
        </form>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
    ruta: {
        type: String,
    }
})

const reviews = ref([])
const newReview = ref({
    title: '',
    content: '',
    name: '',
    email: '',
    rating: 5,
    publicar_en: '',
})

watchEffect(() => {
    newReview.value.publicar_en = props.ruta;
});

const { executeRecaptcha } = useGoogleRecaptcha()

const submitReview = async () => {
    // Ejecuta reCAPTCHA para obtener el token
    const token = await executeRecaptcha('submitReview')

    // Asegúrate de que el token de reCAPTCHA se obtuvo correctamente
    if (!token) {
        alert('Error al obtener la validación de reCAPTCHA.')
        return // Detiene la ejecución si no hay token
    }

    // Define la URL de tu endpoint de WordPress para el CPT 'reviews'
    const apiUrl = 'https://test.clinicaegos.com/wp-json/wp/v2/review'

    // Crea el cuerpo de la solicitud con los datos de la nueva reseña
    const reviewData = JSON.stringify({
        title: newReview.value.title,
        content: newReview.value.content,
        acf: {
            email: newReview.value.email,
            name: newReview.value.name,
            valoracion: newReview.value.rating,
            publicar_en: newReview.value.publicar_en,
        },
        status: 'pending',
        'g-recaptcha-response': token // Incluye el token de reCAPTCHA en tu solicitud
    })

    try {
        const username = 'Emili'
        const appPassword = 'eGJC IeQw yRl0 ucoQ mk1R ggYu'

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`${username}:${appPassword}`)
            },
            body: reviewData,
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }

        const responseData = await response.json()
        alert('Reseña enviada con éxito')
        // Aquí puedes limpiar el formulario o actualizar tus datos locales
    } catch (error) {
        console.error('Error al enviar la reseña:', error)
        alert('Error al enviar la reseña. Por favor, intenta de nuevo.')
    }
}
</script>
