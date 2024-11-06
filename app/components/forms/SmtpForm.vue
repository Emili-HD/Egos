<template>
    <div id="topPage" class="form-landing box-content form-after rounded-2xl max-w-full !w-[max(360px,_35vw)] m-auto">
        <h2 class="h6 text-white p-6 mb-0">Trabaja con el mejor equipo de clínicas de cirugía plástica y reparadora</h2>
        <form @submit.prevent="handleSubmit" class="mx-auto p-6 rounded space-y-4">
            <div>
                <label for="interest" class="block text-sm font-medium text-white">Me interesa trabajar de...</label>
                <select v-model="form.interest" id="interest"
                    class="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white/5 text-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required>
                    <option disabled value="">Selecciona</option>
                    <option value="auxiliar_estetico">Auxiliar estético</option>
                    <option value="asesor_cirugia">Asesor de cirugía</option>
                    <option value="administracion">Administrativo</option>
                    <option value="cirujano">Cirujano</option>
                    <option value="otro">Otro</option>
                </select>
                <span v-if="errors.interest" class="text-red-500 text-sm">{{ errors.interest }}</span>
            </div>

            <div>
                <label for="lugar" class="block text-sm font-medium text-white">Me gustaría trabajar en...</label>
                <select v-model="form.lugar" id="lugar"
                    class="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white/5 text-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required>
                    <option disabled value="">Selecciona</option>
                    <option value="barcelona_guinardo">Barcelona (Guinardó)</option>
                    <option value="barcelona_balmes">Barcelona (Balmes)</option>
                    <option value="barcelona_aribau">Barcelona (Aribau)</option>
                    <option value="badalona">Badalona</option>
                    <option value="granollers">Granollers</option>
                    <option value="sabadell">Sabadell</option>
                    <option value="madrid">Madrid</option>
                    <option value="girona">Girona</option>
                    <option value="hospitalet">Hospitalet</option>
                    <option value="mataro">Mataró</option>
                    <option value="manresa">Manresa</option>
                    <option value="lleida">Lleida</option>
                    <option value="tarragona">Tarragona</option>
                    <option value="reus">Reus</option>
                    <option value="andorra">Andorra</option>
                </select>
                <span v-if="errors.lugar" class="text-red-500 text-sm">{{ errors.lugar }}</span>
            </div>

            <div>
                <label for="name" class="block text-sm font-medium text-white">Nombre</label>
                <input type="text" v-model="form.name" id="name"
                    class="mt-1 block w-full px-4 py-3 bg-white/5 text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
                <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium text-white">Correo</label>
                <input type="email" v-model="form.email" id="email"
                    class="mt-1 block w-full px-4 py-3 bg-white/5 text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
                <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>

            <div>
                <label for="phone" class="block text-sm font-medium text-white">Teléfono</label>
                <input type="tel" v-model="form.phone" id="phone"
                    class="mt-1 block w-full px-4 py-3 bg-white/5 text-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required />
                <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
            </div>

            <div>
                <label for="file" class="block text-sm font-medium text-white">Subir archivo (pdf)</label>
                <input type="file" @change="handleFileChange" id="file"
                    class="mt-1 block w-full p-3 text-sm text-gray-500 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <span v-if="errors.file" class="text-red-500 text-sm">{{ errors.file }}</span>
            </div>

            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input id="acceptMarketing" type="checkbox" v-model="form.acceptMarketing"
                        class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div class="ml-2 text-sm">
                    <label for="acceptMarketing" class="font-medium text-white">Acepto recibir otras comunicaciones de Egos.</label>
                </div>
            </div>

            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input id="acceptPrivacy" type="checkbox" v-model="form.acceptPrivacy"
                        class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" required />
                </div>
                <div class="ml-2 text-sm">
                    <label for="acceptPrivacy" class="font-medium text-white">He leído y acepto la <a href="https://www.clinicaegos.com/politica-de-privacidad/" target="_blank" rel="noopener" class="underline">política de privacidad de Egos</a></label>
                </div>
                <span v-if="errors.acceptPrivacy" class="text-red-500 text-sm">{{ errors.acceptPrivacy }}</span>
            </div>

            <div>
                <button 
                    type="submit"
                    :disabled="isSubmitting || formSubmitted"
                    :class="buttonClass">
                    <span v-if="isSubmitting" class="loader"></span>
                    <span v-else-if="formSubmitted">Formulario enviado con éxito</span>
                    <span v-else>Enviar</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const form = ref({
    interest: '',
    lugar: '',
    name: '',
    email: '',
    phone: '',
    file: null,
    acceptMarketing: false,
    acceptPrivacy: false,
});

const errors = ref({});
const isSubmitting = ref(false);
const formSubmitted = ref(false);

const mail = useMail();

const handleFileChange = (event) => {
    const target = event.target;
    if (target.files) {
        form.value.file = target.files[0];
    }
};

const validateForm = () => {
    errors.value = {};

    if (!form.value.interest) {
        errors.value.interest = 'Este campo es obligatorio.';
    }
    if (!form.value.lugar) {
        errors.value.lugar = 'Este campo es obligatorio.';
    }
    if (!form.value.name) {
        errors.value.name = 'Este campo es obligatorio.';
    }
    if (!form.value.email) {
        errors.value.email = 'Este campo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
        errors.value.email = 'Por favor, ingrese un correo válido.';
    }
    if (!form.value.phone) {
        errors.value.phone = 'Este campo es obligatorio.';
    } else if (!/^\d{9}$/.test(form.value.phone)) {
        errors.value.phone = 'El teléfono debe tener 9 dígitos.';
    }
    if (!form.value.file) {
        errors.value.file = 'Debe adjuntar un archivo.';
    }
    if (!form.value.acceptPrivacy) {
        errors.value.acceptPrivacy = 'Debe aceptar la política de privacidad.';
    }

    return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
    if (!validateForm()) {
        return;
    }

    isSubmitting.value = true; // Empieza a enviar el formulario

    try {
        let attachments = [];

        if (form.value.file) {
            // Usar FileReader para convertir el archivo a base64
            const reader = new FileReader();
            await new Promise((resolve, reject) => {
                reader.onload = () => {
                    attachments.push({
                        filename: form.value.file.name,
                        content: reader.result.split(',')[1], // Obtén solo la parte base64 del resultado
                        encoding: 'base64',
                    });
                    resolve();
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(form.value.file);
            });
        }

        await mail.send({
            from: {
                name: form.value.name,
                address: form.value.email,
            },
            to: 'rrhh@clinicaegos.com',
            subject: 'Solicitud de empleo',
            text: `Interés: ${form.value.interest}\nLugar: ${form.value.lugar}\nNombre: ${form.value.name}\nCorreo: ${form.value.email}\nTeléfono: ${form.value.phone}\nAcepta comunicaciones: ${form.value.acceptMarketing ? 'Sí' : 'No'}`,
            attachments,
        });

        formSubmitted.value = true; // Marcar el formulario como enviado
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
        isSubmitting.value = false; // Dejar de enviar
    }
};

// Computed property para manejar las clases del botón
const buttonClass = computed(() => {
    if (isSubmitting.value) {
        return 'bg-gray-500 cursor-not-allowed text-white block w-full p-2 rounded-lg';
    } else if (formSubmitted.value) {
        return 'bg-green-500 text-white block w-full p-2 rounded-lg';
    } else {
        return 'bg-gold-2 p-2 text-nude-8 text-center uppercase hover:bg-gold-1 hover:text-blue-1 rounded-xl transition-colors duration-500 block w-full rounded-lg';
    }
});
</script>


<style scoped>
.submit {
    @apply bg-gold-2 text-nude-8 text-center uppercase hover:bg-gold-1 hover:text-blue-1 rounded-xl transition-colors duration-500 block w-full;
}

.loader {
    @apply border-2 border-[#f3f3f3] border-t-blue-6 rounded-full size-6 inline-block;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
