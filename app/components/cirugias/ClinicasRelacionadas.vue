<template>
	<section class="py-12 xl:py-20 grid grid-cols-16 gap-4 border-y border-current">
		<div class="col-[2/-2] lg:col-start-2 lg:col-span-7">
			<h2 class="max-lg:text-clamp-3xl">{{ titulo }}</h2>
			<div v-html="texto"></div>
		</div>
		<div
			class="links-clinicas col-[2/-2] lg:col-start-10 lg:col-span-6 lg:self-center flex flex-wrap max-lg:justify-between gap-1 items-center h-fit">
			<UiButton v-for="clinica in data" :key="clinica.ID" :to="formatPermalink(clinica.permalink)"
				class="new [.estetica_&]:!bg-vermell/5 [.estetica_&]:!text-vermell max-sm:text-xs sm:text-sm max-lg:!w-full lg:min-w-[calc(50%-1rem)]">
				{{ cirugia }} en {{ clinica.post_excerpt.split(" ")[1] }}</UiButton>
		</div>
	</section>
</template>

<script setup>
	const props = defineProps({
		titulo: {
			type: String,
			required: true
		},
		texto: {
			type: String,
			required: true
		},
		data: {
			type: Array,
			required: true
		},
		cirugia: {
			type: String,
			required: true
		},
	})

	// Función que formatea el permalink para devolver la ruta relativa
	const formatPermalink = (permalink) => {
		return permalink.replace('https://clinicaegos.com', '')
	}
</script>
