<template>
    <div v-if="error">Error al cargar los datos: {{ error }}</div>
    <main v-else class="site-main" v-if="home && home.acf">
        <UiBotonCita :data="home.acf.boton_cita" />
        <HomeWellcome :data="home" />
        <NuxtLazyHydrate when-idle>
            <LazyHomeCategories v-if="home.acf.tratamientos_home.categorias_home" :data="home.acf.tratamientos_home"
                sectionId="tratamientos" />
            <LazyHomeCategories v-if="home.acf.ofertas_cirugias_home.categorias_home"
                :data="home.acf.ofertas_cirugias_home" sectionId="ofertas-cirugias" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <ElementsHablan :data="home.acf" />
        </NuxtLazyHydrate>
        <section id="opiniones"
            class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max px-8 py-24 xl:px-[calc(100%/16)] mt-32"
            data-anchor="opiniones">
            <h2 class="h4 text-center">Valoraciones que reflejan nuestro compromiso con la calidad</h2>
            <UiGoogleReviews placeid="ChIJffDn5p2ZpBIRmOqD4_uX82U" />
        </section>
        <HomeTestimonios />
        <NuxtLazyHydrate when-idle>
            <LazyFormsPiceCita :portalId="String(home.acf.formulario.portalid)" :formId="home.acf.formulario.formid"
                :tipo="home.acf.formulario.tipo_de_formulario" :name="home.title.rendered" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <LazyHomeAcordeon :data="home.acf.acordeon_cirugias" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <LazyHomeEspecialists />
        </NuxtLazyHydrate>
        <section
            class="doctor__description grid grid-cols-16 pb-0 pt-32 xl:pt-48 [html:not(.blackfriday)_&]:bg-blue-1 [html.blackfriday_&]:bg-black">
            <LazyDoctorInsta v-if="insta && insta.length" :data="insta" :name="'@clinicaegos'" :tipo="'home'"
                :ruta="'home'" class="col-[2/16] [&_h2]:text-nude-8 [&_article]:xl:w-[calc(33%-1rem)]" />
        </section>
        <section v-if="home.acf.descripcion_equipo"
            class="flex flex-col-reverse lg:flex-row justify-center items-center gap-[calc(100vw/16)] px-[calc(100%/16)] min-h-vh/80">
            <div class="aspect-[9/16] w-full lg:w-1/4">
                <UiVideo :videoId="home.acf.descripcion_equipo.video" />
            </div>
            <div class="aspect-[9/16] w-full lg:w-1/4">
                <UiVideo :videoId="home.acf.descripcion_equipo.video_dos" />
            </div>
            <div class="w-full lg:w-1/2 py-8">
                <h2 class="text-clamp-3xl lg:text-clamp-5xl">{{ home.acf.descripcion_equipo.titulo }}</h2>
                <div v-html="home.acf.descripcion_equipo.descripcion"></div>
            </div>
        </section>
        <NuxtLazyHydrate when-idle>
            <ElementsInfluencers />
        </NuxtLazyHydrate>
    </main>
</template>

<script setup>
    const route = useRoute();

    provide('routePath', route.fullPath);

    const { data: home, error } = await useAsyncData(() => getPage(8))
    const { data: insta, refresh: refresInsta } = useAsyncData('insta-home', () => getInstaComments({ page: 1, per_page: 100 }));

    // Genera los metadatos de Yoast
    const { generateYoastHead } = useYoastHead(home);
    const yoastHead = generateYoastHead();

    useHead({
        ...yoastHead,
    });
</script>
