<template>
    <section class="min-h-screen flex items-center">
        <div class="w-screen/50 mx-auto p-4">
            <form @submit.prevent="handleSubmit">
                <!-- Campo Nombre -->
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                    <input id="name" v-model="form.name" type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>

                <!-- Campo Email -->
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" v-model="form.email" type="email"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>

                <!-- Campo Teléfono -->
                <div class="mb-4">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input id="phone" v-model="form.phone" type="tel"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>

                <!-- Campo Especialidad (Select) -->
                <div class="mb-4">
                    <label for="specialty" class="block text-sm font-medium text-gray-700">Especialidad</label>
                    <select id="specialty" v-model="form.specialty"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required>
                        <option disabled value="">Seleccione una especialidad</option>
                        <option value="Auxiliar Estético">Auxiliar Estético</option>
                        <option value="Cirujano">Cirujano</option>
                        <option value="Asesor de Cirugía">Asesor de Cirugía</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <!-- Campo de texto para "Otra especialidad" -->
                <div v-if="form.specialty === 'Otro'" class="mb-4">
                    <label for="otherSpecialty" class="block text-sm font-medium text-gray-700">Especifique su
                        especialidad</label>
                    <input id="otherSpecialty" v-model="form.otherSpecialty" type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>

                <!-- Campo Mensaje -->
                <div class="mb-4">
                    <label for="message" class="block text-sm font-medium text-gray-700">Mensaje</label>
                    <textarea id="message" v-model="form.message"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required></textarea>
                </div>

                <button type="submit"
                    class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Enviar
                </button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

</script>
