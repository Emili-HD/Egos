<template>
  <NuxtLayout>
    <div class="prose">
      <template v-if="error.statusCode === 404">
        <h1>404!</h1>
        <p>Sorry, that page doesn't exist.</p>
      </template>
      <template v-else>
        <h1>Dang</h1>
        <p>
          <strong>{{ error.message }}</strong>
        </p>
        <p>It looks like something broke.</p>
        <p>Sorry about that.</p>
      </template>
      <p>
        Go back to your
        <NuxtLink to="/">Volver al inicio</NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Aquí puedes agregar lógica JavaScript si es necesario
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  font-size: 5rem;
}

p {
  font-size: 1.5rem;
}
</style>
