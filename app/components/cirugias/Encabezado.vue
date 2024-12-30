<template>
    <header
        class="heading__cirugias min-h-vh px-8 xl:px-16 py-6 xl:py-12 mb-0 col-[1_/_span_16] xl:col-span-10 flex justify-center items-end bg-cover bg-center"
        :style="`background: linear-gradient(to bottom, rgba(28, 44, 68, 0) 10%, rgba(28, 44, 68, 0.75) 80%), url('${data.featured_image_data.url}'); background-size: cover; background-position: center;`">
        <div class="header__content z-10 lg:mb-16">

            <!-- Contador rebajas -->
            <div v-if="data.acf && data.acf.rebaja" class="flex flex-col-reverse gap-4">
                <h1 v-if="data.title && data.title.rendered"
                    class="text-nude-8 mb-6 text-clamp-4xl lg:text-clamp-6xl text-balance leading-none text-center">
                    <u>{{ data.title.rendered }}</u>
                </h1>

                <div class="flex flex-col sm:flex-row-reverse gap-8 justify-center items-center">
                    <div class="flex gap-2 bg-blue-1/60 backdrop-blur-lg p-4 xl:p-8 w-fit rounded-2xl m-0">
                        <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline [&>span]:text-red-600 [&>span]:opacity-50"
                            v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></div>
                        <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline"
                            v-if="data.acf && data.acf.rebaja" v-html="data.acf.rebaja"></div>
                    </div>
                    <ElementsButton v-if="showPresupuestoLink" class="gold text-clamp-xs uppercase text-center h-fit"
                        href="#presupuesto">
                        Calcula tu presupuesto
                    </ElementsButton>
                    <ElementsCountDown class="x2 max-w-lg m-0" :data="data.acf" />
                </div>
            </div>

            <!-- Plazas disponibles -->
            <!-- <div v-else-if="data.acf && data.acf.plazas && data.acf.plazas.numero_plazas && data.acf.plazas.numero_plazas.lenght !== null && showPlazas">
                <div class="flex flex-col lg:flex-row justify-center items-center gap-4 mb-3">
                    <ElementsPlazas :data="data.acf.plazas" />
                    <ElementsButton v-if="showPresupuestoLink" class="gold text-clamp-sm uppercase text-center text-balance"
                        href="#presupuesto">
                        Calcula tu presupuesto con descuento BLACK
                    </ElementsButton>
                </div>
                <h1 v-if="data.title && data.title.rendered"
                    class="text-nude-8 mb-6 text-clamp-6xl text-balance text-center leading-none max-w-[25ch]"><u>{{ data.title.rendered }}</u>
                </h1>
            </div> -->

            <!-- Encabezado normal -->
            <div v-else class="flex gap-6 flex-col items-center">
                <p class="desde !text-nude-8 leading-none text-2xl [&>span]:span-gradient bg-blue-1/60 [.blackfriday_&]:bg-black backdrop-blur-lg p-4 mb-0 w-fit rounded-2xl flex flex-row justify-center gap-2 items-center"
                    v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></p>
                <ElementsButton v-if="showPresupuestoLink" class="gold text-clamp-sm uppercase text-center w-fit"
                    href="#presupuesto">
                    Calcula tu presupuesto
                </ElementsButton>
                <div class="max-xl:mt-20 text-center">
                    <h1 v-if="data.title && data.title.rendered"
                        class="text-nude-8 mb-6 text-clamp-4xl text-balance leading-none text-center max-w-[30ch]">{{
                        data.title.rendered }}</h1>
                    <img v-if="data.acf && data.acf.logo" :src="data.acf.logo.url" width="270" height="44"
                        alt="Bloome by Egos" class="mx-auto">
                    <!-- <div v-if="data.content && data.content.rendered" class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-2xl [&>h2]:text-balance [&>p]:text-lg [&>p]:text-balance [&>p]:max-w-[75ch]" v-html="data.content.rendered"></div> -->
                </div>
            </div>

        </div>
    </header>
    <div v-if="data.acf && data.acf.formulario" id="formulario"
        class="form__wrapper min-h-[620px] [.site-main:not(.tratamiento-113)_&]:bg-blue-1 [html:not(.estetica)_&]:bg-blue-1 [.estetica:not(.blackfriday)_&]:!bg-crema [.blackfriday_&]:!bg-blackfriday p-16 xl:pt-24 col-[1_/_span_16] xl:col-span-6 flex flex-col justify-center items-stretch">
        <FormsCirugia :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)"
            :formId="data.acf.formulario.formid" :name="data.title.rendered" :route="route" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showPresupuestoLink = ref(false);
const checkPresupuestoLink = () => {
    showPresupuestoLink.value = !!document.getElementById('presupuesto');
}

// Props
const props = defineProps({
    data: {
        type: Object
    },
    route: String,
})


const showPlazas = ref(false);  // Inicialmente ocultamos las plazas

// Función para convertir una fecha en formato DD/MM/YYYY a un objeto Date
const parseDate = (dateString) => {
    if (!dateString) return null; // Si no hay fecha, devolvemos null

    // Detectamos el formato DD/MM/YYYY
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);

    if (match) {
        const day = match[1];
        const month = match[2] - 1; // Los meses van de 0 (enero) a 11 (diciembre) en JS
        const year = match[3];

        const parsedDate = new Date(year, month, day);

        // Verificamos si la fecha es válida
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
        }
    }

    // console.error('Fecha en formato incorrecto:', dateString);
    return null;
};


// Función para verificar si la campaña ya ha comenzado
const verificarFechaInicio = () => {
    const today = new Date();  // Fecha actual con hora
    const todayNoTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Sin horas

    // Verificamos si existen los datos necesarios para calcular la fecha de inicio
    if (props.data.acf && props.data.acf.plazas && props.data.acf.plazas.desde) {
        const startDate = parseDate(props.data.acf.plazas.desde);  // Fecha de inicio sin horas
        // console.log('Fecha inicio:', startDate, 'Hoy:', todayNoTime); // Verificación en consola

        // Si hoy es mayor o igual a la fecha de inicio, mostramos las plazas
        showPlazas.value = todayNoTime >= startDate;
    } else {
        console.log('No hay información de plazas o fecha de inicio disponible');
    }
};

let observer; // Define observer in the outer scope

onMounted(() => {
    checkPresupuestoLink(); // Initial check in case #presupuesto is already in the DOM
    verificarFechaInicio()

    observer = new MutationObserver(() => {
        checkPresupuestoLink();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<style scoped>
.heading__cirugias {
    width: 100%;
    /* height: calc(100 * var(--vh) - 50px); */
    /* min-height: 700px; */
    /* @media (min-width: 1025px) {
        height: 900px;
        max-height: 100vh;
    }
    @media (min-width: 1440px) {
        height: 1100px;
        max-height: 100vh;
    }
    @media (max-width: 1024px) {
        height: 700px;
    }
    @media (max-width: 768px) {
        height: 940px;
    }
    @media (max-width: 560px) {
        height: 800px;
    } */
}
</style>
