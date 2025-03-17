<template>
   <div class="instagram-wrapper">
      <ClientOnly>
         <swiper-container class="tiktokSlide">
            <swiper-slide v-for="image in instagramData?.data" :key="image.id">
               <a :href="image.permalink" :key="image.id" target="_blank" rel="noreferrer">
                  <img v-if="image.media_type === 'IMAGE' ||
                     image.media_type === 'CAROUSEL_ALBUM'
                  " :src="image.media_url" :alt="image.caption" :key="image.id" class="instagram-gallery-image" />
                  <video v-else :key="image.media_url" class="instagram-gallery-image">
                     <source :src="image.media_url" type="video/mp4" />
                  </video>
               </a>
               <span v-if="showCaption" class="instagram-caption">{{ image.caption }}</span>
            </swiper-slide>
         </swiper-container>
      </ClientOnly>
   </div>
</template>

<script setup>
   import { ref, onMounted } from "vue";
   import axios from "axios";

   const props = defineProps({
      accessToken: String,
      caption: Boolean,
   });

   const instagramRef = ref(null)

   useSwiper(containerRef, {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      navigation: true,
      autoplay: {
         delay: 5000,
      },
      breakpoints: {
         '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
         },
         '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
         },
         '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
         },
      }
   })

   const isLoading = ref(true);
   const hasError = ref(false);
   const instagramData = ref(null);
   const showCaption = ref(false);

   const fetchInstaData = (url) => {
      axios
         .get(url)
         .then((response) => {
            if (response.hasOwnProperty("error")) {
               isLoading.value = false;
               hasError.value = true;
            } else {
               instagramData.value = response.data;
               isLoading.value = false;
            }
         })
         .then(() => {
            if (props.caption) {
               showCaption.value = props.caption;
            }
         })
         .catch((error) => {
            console.log("Error:", error);
            hasError.value = true;
            isLoading.value = false;
         });
   };

   onMounted(() => {
      const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&access_token=${props.accessToken}`;
      // const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&access_token=IGQWRPdUgyZAXpfb2o5aTZArbGJnZATYwRUJhYmMtMnFfSW10ak40VU5qelRNUHc0NzAxd0lPdU1BZAGwzZAUVQQTFVQndoMkJ1QVhoY2pPNGpMamJsV2dFN3BMZAUxYUTN0ZADg2SGdsQll1MkJCZAVdjS1A5dmZAsNDZAsSzAZD`;
      fetchInstaData(url);
   });
</script>

<style scoped>
   .instagram-wrapper {
      max-width: 100%;
      margin: 0 auto;
      /* padding: 0 2rem; */
   }

   .instagram-gallery {
      display: flex;
      flex-wrap: wrap;
      margin: -1rem, -1rem;
      padding-bottom: 3rem;
   }

   .instagram-gallery-item {
      position: relative;
      flex: 1 0 22rem;
      margin: 1rem;
      color: #fff;
      cursor: pointer;
   }

   .instagram-gallery-image {
      width: 100%;
      height: 80%;
      object-fit: cover;
   }

   .instagram-caption {
      color: black;
      margin-top: -3px;
   }
</style>
