<template>
  <section v-if="data" class="cirugias col-[1_/_span_16] mb-36 pt-0" ref="categorias">
    <div class="cirugias__grid mt-5 grid grid-cols-[repeat(16,_minmax(0_,1fr))] gap-1">
      <h2 v-if="data.cirugias" class="cirugias__heading col-[2_/_span_14] my-12 text-center w-full text-balance">
        {{ data.cirugias.titulo_cirugias }}
      </h2>
      <div v-if="data.cirugias && data.cirugias.cirugias_relacionadas" class="cirugias__grid-inner flex flex-wrap col-[2_/_span_14]">
        <div class="card__wrapper w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
          v-for="categoryId in data.cirugias.cirugias_relacionadas" :key="categoryId"
        >
          <CirugiasCategorySlide
            :categoryId="categoryId"
            :classes="'aspect-square'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

const categorias = ref(null)

// Props
const props = defineProps({
  data: {
    type: Object,
  },
})

// console.log(props.data.cirugias.cirugias_relacionadas);
</script>

<style lang="scss" scoped></style>
