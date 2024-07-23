<template>
  <div class="relative inline-block w-1/4">
    <label for="country-select" class="block text-sm font-medium text-gray-700">Código País</label>
    <select
      id="country-select"
      v-model="selectedCountry"
      class="block w-full mt-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      <option v-for="country in countries" :key="country.code" :value="country.code">
        {{ country.name }} ({{ country.code }})
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { countries } from '~/data/countries';

// Inicializar selectedCountry con el valor del prefijo telefónico de España
const selectedCountry = ref('+34');
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
