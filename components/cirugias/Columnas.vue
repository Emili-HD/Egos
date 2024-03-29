<template>
  <div
    v-if="contentData.list_tabs && contentData.opciones_listado == 'columnas'"
    class="answer__columnas columnas col-[1_/_-1] grid grid-cols-16 gap-y-0 xl:gap-4"
  >
    <div
      v-for="(column, index) in contentData.list_tabs"
      :key="index"
      :class="`columna${index + 1}`"
      class="bg-nude-6 p-8 mt-0 xl:mt-16 w-full xl:w-[calc(100%+5rem)] max-h-[unset] xl:max-h-[80vh] h-fit xl:h-auto flex flex-col justify-center items-start gap-8"
    >
      <Swiper
        :direction="'vertical'"
        :slidesPerView="'auto'"
        :freeMode="true"
        :scrollbar="true"
        :mousewheel="true"
        :modules="[SwiperFreeMode, SwiperScrollbar, SwiperMousewheel]"
        class="swiperColumn w-full h-fit lg:h-[34rem] p-0 lg:py-8 pointer-events-none lg:pointer-events-auto [&>h2]:text-clamp-xl"
      >
        <SwiperSlide class="h-auto box-border pr-8">
          <h2 class="h4" v-html="column.list_title"></h2>
          <div
            class="[&>ul]:list-disc [&>ul>li]:mb-6"
            v-html="column.content_list"
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
    <CirugiasFigure :contentData="contentData" />
  </div>
  <CirugiasDetallesCirugia
    v-if="contentData.opciones_listado === 'columnas'"
    class="tips flex flex-col lg:flex-row justify-center gap-4 bg-transparent items-stretch text-nude-8 font-normal"
    :detallesData="contentData.incluido_cirugia.tips ?? []"
  />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
// import gsap from 'gsap';
// import { SwiperFreeMode, SwiperScrollbar, SwiperMousewheel } from 'swiper/modules';

const { $gsap: gsap } = useNuxtApp()
// Importa los estilos de Swiper
// import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

// Props
const props = defineProps({
  contentData: {
    type: Object,
    required: true,
  },
})

// Módulos
// const modules = [SwiperFreeMode, SwiperScrollbar, SwiperMousewheel];

const preventLenis = () => {
  const columna = document.querySelectorAll('.swiperColumn')
  let mm = gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    columna.forEach((col) => {
      const columnaHeight = col.offsetHeight
      const innerHeight = col.querySelector('.swiper-slide').offsetHeight
      // console.log(columnaHeight, innerHeight);

      if (innerHeight > columnaHeight) {
        col.setAttribute('data-lenis-prevent', '')
      }
    })
  })
}

onMounted(() => {
  preventLenis()
})
</script>

<style lang="scss">
.swiperColumn {
  .swiper-slide {
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
