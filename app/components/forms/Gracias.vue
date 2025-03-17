<script setup>
	import { ref, onMounted, nextTick } from 'vue'
	import { useRouter } from 'vue-router'

	const router = useRouter()
	const route = useRoute();

	const props = defineProps({
		portalId: {
			type: String,
			required: true
		},
		formId: {
			type: String,
			required: true
		},
		titulo: {
			type: String,
			required: true
		},
		identificador: {
			type: String,
			required: true
		},
		image: {
			type: Object,
			required: false,
			default: null
		},
		name: {
			type: String,
			required: true
		},
	})

	const routePath = route.fullPath

	const formData = ref({})
	const formStructure = ref(null)
	const isLoading = ref(true)
	const errors = ref({})
	const submitButtonText = ref('Enviar')
	const dependentFields = ref([])
	const radioFieldGroups = ref([])
	const currentStep = ref(0)

	// console.log('datos hubspot:', props.formId, props.portalId);


	const loadFormStructure = async () => {
		await nextTick(); // Asegura que los cambios de DOM estén aplicados antes de continuar.
		try {
			// Usar $fetch en lugar de useFetch
			const response = await $fetch('/api/getHubSpotEstetica', {
				query: { formId: props.formId }
			});

			// Validar la respuesta
			if (!response || !response.data) {
				throw new Error('Invalid form data');
			}

			// Asignar la estructura del formulario
			formStructure.value = response.data;

			// console.log('Quiz Structure:', formStructure.value)

			// Filtrar solo los grupos de campos que contienen campos de tipo radio
			radioFieldGroups.value = formStructure.value.fieldGroups.filter(group =>
				group.fields && group.fields.some(field => field.fieldType === 'radio')
			);

			// Inicializar el formData
			formStructure.value.fieldGroups.forEach(group => {
				if (group.fields) {
					group.fields.forEach(field => {
						formData.value[field.name] = field.defaultValues ? field.defaultValues[0] : '';
					});
				}
			});

			// Establecer el texto del botón de envío
			submitButtonText.value = formStructure.value.displayOptions?.submitButtonText || 'Enviar';
		} catch (e) {
			// Manejo de errores
			console.error('Error loading form structure:', e.message);
		} finally {
			// Asegurarse de que el estado de carga se desactiva
			isLoading.value = false;
		}
	};

	/// Datos reactivos
	const defaultUTM = reactive({
		utm_campaign: 'SEO',
		utm_content: props.name,
		utm_medium: 'Web',
		utm_source: `https://clinicaegos.com${routePath}`,
		utm_term: props.name,
		isEgosSurgery: 'true'
	});

	// Datos reactivos para los utm
	const utmData = reactive({ ...defaultUTM })

	// Función para leer los parámetros de la URL
	const getUTMFromURL = () => {
		const urlParams = new URLSearchParams(window.location.search)
		const utmKeys = Object.keys(defaultUTM)

		// Recorremos las claves de los UTM y si están en la URL, las sobrescribimos
		utmKeys.forEach(key => {
			if (urlParams.has(key)) {
				utmData[key] = urlParams.get(key)
			}
		})
	}

	const handleSubmit = async () => {
		await nextTick()
		errors.value = {}

		const isValid = validateForm()
		if (!isValid) {
			return
		}

		try {
			const legalConsentOptions = formStructure.value.legalConsentOptions ? {
				consentToProcess: true,
				text: "I agree to allow Example Company to store and process my personal data.",
				communications: Array.isArray(formStructure.value.legalConsentOptions.communicationsCheckboxes)
					? formStructure.value.legalConsentOptions.communicationsCheckboxes.map(checkbox => ({
						value: !!formData.value[checkbox.subscriptionTypeId],
						subscriptionTypeId: checkbox.subscriptionTypeId,
						text: checkbox.label || ''
					}))
					: []
			} : undefined

			const formDataFiltered = Object.keys(formData.value)
				.filter(key => key !== 'consent')
				.map(key => ({
					name: key,
					value: formData.value[key]
				}))

			// Añadir los campos UTM de utmData a formDataFiltered
			const utmFields = Object.keys(utmData).map(key => ({
				name: key,
				value: utmData[key]
			}));

			// Combinar formDataFiltered con los valores de UTM
			const combinedFields = [...formDataFiltered, ...utmFields]

			// Crear el objeto de datos que se enviará
			const submissionData = {
				fields: combinedFields,
				context: {
					pageUri: window.location.href,
					pageName: document.title
				},
				legalConsentOptions: legalConsentOptions ? { consent: legalConsentOptions } : undefined
			};

			// console.log('Datos de envío a HubSpot:', JSON.stringify(submissionData, null, 2))

			const hubspotFormEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${props.portalId}/${props.formId}`

			const response = await fetch(hubspotFormEndpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(submissionData)
			})

			const textResponse = await response.text()

			// console.log('Raw Response from HubSpot:', textResponse)

			try {
				const jsonResponse = JSON.parse(textResponse)

				// console.log('Parsed Response from HubSpot:', jsonResponse)

				if (!response.ok) {
					console.error('Error Response Data:', jsonResponse)
					throw new Error(jsonResponse.message || 'Error al enviar el formulario')
				}

				// Redirigir según la ruta actual a la página gracias o al calendario de bloome
				if (routePath && routePath.includes('/medicina-estetica/')) {
					window.location.href = 'https://heybloome.com/calendarios/';
				} else {
					await router.push('/gracias');
				}
			} catch (e) {
				console.error('Response is not valid JSON:', textResponse)
				throw new Error('Response is not valid JSON')
			}
		} catch (e) {
			console.error('Error submitting form:', e.message)
		}
	}

	// Función para añadir el prefijo del país
	const addCountryPrefix = (fieldName) => {
		if (!formData.value[fieldName].startsWith('+')) {
			formData.value[fieldName] = '+34' + formData.value[fieldName]
		}
	}

	const validateForm = () => {
		let isValid = true

		formStructure.value.fieldGroups.forEach(group => {
			if (group.fields) {
				group.fields.forEach(field => {
					if (!formData.value[field.name] && field.required) {
						errors.value[field.name] = 'Este campo es obligatorio.'
						isValid = false
					} else if (field.fieldType === 'email' && !validateEmail(formData.value[field.name])) {
						errors.value[field.name] = 'Debe ser un correo electrónico válido.'
						isValid = false
					} else if (field.fieldType === 'phone' && !validatePhone(formData.value[field.name])) {
						errors.value[field.name] = 'Debe ser un número de teléfono válido.'
						isValid = false
					}
				})
			}
		})

		if (formStructure.value.legalConsentOptions) {
			if (formStructure.value.legalConsentOptions.consentToProcessCheckboxLabel && !formData.value.consent) {
				errors.value.consent = 'Debe aceptar la política de privacidad.'
				isValid = false
			}

			formStructure.value.legalConsentOptions.communicationsCheckboxes.forEach(checkbox => {
				if (checkbox.required && !formData.value[checkbox.subscriptionTypeId]) {
					errors.value[checkbox.subscriptionTypeId] = 'Este campo es obligatorio.'
					isValid = false
				}
			})
		}

		return isValid
	}

	const validateEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return regex.test(email)
	}

	const validatePhone = (phone) => {
		const regex = /^\+\d{1,3}\d{7,20}$/
		return regex.test(phone)
	}

	const isStepValid = computed(() => {
		const currentGroup = radioFieldGroups.value[currentStep.value]

		// Verifica si el grupo actual tiene campos válidos
		if (!currentGroup || !currentGroup.fields) return false

		// Recorre los campos y comprueba si todos los radios requeridos tienen un valor
		return currentGroup.fields.every(field => {
			if (field.fieldType === 'radio') {
				return !!formData.value[field.name]
			}
			return true
		})
	})


	// Función para avanzar al siguiente paso
	// const nextStep = () => {
	// 	if (isStepValid.value) {
	// 		currentStep.value++
	// 		delete errors.value['currentStep'] // Limpia el error si avanza
	// 	} else {
	// 		errors.value['currentStep'] = 'Por favor, selecciona una opción para continuar.'
	// 	}
	// }


	// const prevStep = () => {
	// 	if (currentStep.value > 0) {
	// 		currentStep.value--
	// 	}
	// }

	// const handleRadioChange = () => {
	// 	nextStep()
	// }

	// Función para verificar si un campo dependiente debe ser visible
	const shouldShowDependentField = (subField) => {
		const condition = subField.dependentCondition
		if (!condition || !condition.values) {
			return false
		}
		if (condition.operator === 'set_any') {
			return condition.values.includes(formData.value['surgery_type'])
		}
		return false
	}

	// Vigilar el campo principal para actualizar la visibilidad de los campos dependientes
	watch(() => formData.value['surgery_type'], (newValue) => {
		// console.log('Interes changed to:', newValue)
	})

	onMounted(async () => {
		await loadFormStructure();  // Asegúrate de que esto se completa

		// Leer los UTM de la URL y sobrescribir los valores predeterminados
		getUTMFromURL()

		await nextTick();  // Esperamos un ciclo de actualización si es necesario
		// console.log('Valores de formData asignados:', utmData);
	})


</script>

<template>
	<div v-if="!isLoading && formStructure && formStructure.fieldGroups" :id="props.identificador"
		class="form-landing w-full flex even:flex-row-reverse">
		<div class="left-image w-1/2 h-full overflow-hidden [.is-mobile_&]:hidden"
			v-if="props.image && props.image.url">
			<img class="absolute size-full object-cover object-center" :src="props.image.url"
				:srcset="props.image.srcset" :alt="props.image.alt" :width="props.image.width"
				:height="props.image.height">
		</div>
		<div class="w-full p-6 lg:py-16 border border-nude-8/[0.1] [.blackfriday_&]:bg-blackfriday [html:not(.blackfriday_&)]:bg-nude-8/[0.025] rounded-2xl"
			:class="{ 'lg:w-1/2': props.image && props.image.url, 'lg:w-full': !(props.image && props.image.url) }">
			<h2 class="h5 max-lg:text-clamp-xl text-nude-8 xl:pb-2 text-pretty xl:text-center mb-0">{{ props.titulo }}
			</h2>
			<form @submit.prevent="handleSubmit" class="flex flex-col p-0">

				<div v-for="(group, groupIndex) in radioFieldGroups" :key="groupIndex"
					v-show="groupIndex === currentStep" class="step !relative">
					<template v-if="group.fields && Array.isArray(group.fields)">
						<template v-for="field in group.fields" :key="field.name">
							<template v-if="field && !field.hidden">

								<div class="mb-4">
									<template v-if="field.fieldType === 'radio'">
										<div
											class="form__group field flex flex-wrap justify-center gap-x-6 gap-y-3 !pt-0">
											<label
												class="form__label w-full !relative text-clamp-lg leading-none text-center font-nunito">{{
													field.label }}</label>
											<p class="w-full max-lg:text-clamp-sm text-white mb-0 italic text-center">
												Selecciona una imagen para continuar</p>
											<div v-for="option in field.options" :key="option.value"
												class="form-check flex justify-start items-center flex-nowrap size-[calc((100%/2)-1rem)] lg:size-[calc(28%-1rem)]">
												<input type="radio" :id="option.value" :name="field.name"
													:value="option.value" v-model="formData[field.name]"
													required="required"
													:class="{ 'border-red-500': errors[field.name] }"
													class="form-check-input !size-3 !hidden"
													@change="handleRadioChange" />
												<label :for="option.value"
													class="form-check-label size-full aspect-square p-1 !text-blue-1 font-normal uppercase flex flex-col justify-end items-center cursor-pointer"
													:class="option.value">{{ option.label }}</label>
											</div>
											<p v-if="errors[field.name]" class="text-red-500 text-sm">{{
												errors[field.name] }}</p>
										</div>
									</template>
									<template v-else-if="field.fieldType === 'multiple_checkboxes'">
										<div class="form__group field flex flex-wrap justify-center gap-x-6 !pt-0">
											<label
												class="form__label w-full !relative text-clamp-xl leading-none text-center font-nunito">{{
													field.label }}</label>
											<p class="w-full text-white mb-0 italic text-center">Selecciona una imagen
												para continuar</p>
											<div v-for="option in field.options" :key="option.value"
												class="form-check flex justify-start items-center flex-nowrap size-[calc((100%/2)-1rem)] lg:size-[calc(28%)-1rem)]">
												<input type="checkbox" :id="option.value" :name="field.name"
													:value="option.value" v-model="formData[field.name]"
													required="required"
													:class="{ 'border-red-500': errors[field.name] }"
													class="form-check-input !size-3 !hidden font-nunito"
													@change="handleRadioChange" />
												<label :for="option.value"
													class="form-check-label size-full aspect-square p-1 !text-blue-1 font-normal uppercase flex flex-col justify-end items-center cursor-pointer font-nunito"
													:class="option.value">{{ option.label }}</label>
											</div>
											<p v-if="errors[field.name]" class="text-red-500 text-sm">{{
												errors[field.name] }}</p>
										</div>
									</template>
								</div>
								<p v-if="errors['currentStep']" class="text-red-500 text-sm text-center">
									{{ errors['currentStep'] }}
								</p>
							</template>
						</template>
					</template>
					<div v-if="group.richText" v-html="group.richText"></div>
				</div>

				<div v-show="currentStep === radioFieldGroups.length"
					class="step-last xl:px-4 [&_span]:leading-none [&_div]:max-lg:!text-left [&_span]:max-lg:text-clamp-base [&_span]:text-2xl">
					<div v-for="group in formStructure.fieldGroups" :key="group.richText">
						<template v-if="group.fields && Array.isArray(group.fields)">
							<template v-for="field in group.fields" :key="field.name">
								<template v-if="field && !field.hidden">

									<div class="mb-0">
										<template v-if="field.fieldType === 'single_line_text'">
											<div class="form__group field">
												<input type="text" :id="field.name" v-model="formData[field.name]"
													:required="field.required" :placeholder="field.label"
													:class="{ 'border-red-500': errors[field.name] }"
													class="form-input form__field" />
												<label :for="field.name"
													class="form__label font-nunito max-lg:text-sm">{{
														field.label
													}}</label>
												<p v-if="errors[field.name]" class="text-red-500 text-sm">{{
													errors[field.name] }}</p>
											</div>
										</template>

										<template v-else-if="field.fieldType === 'email'">
											<div class="form__group field">
												<input type="email" :id="field.name" v-model="formData[field.name]"
													:required="field.required" :placeholder="field.label"
													:class="{ 'border-red-500': errors[field.name] }"
													class="form-input form__field" />
												<label :for="field.name"
													class="form__label font-nunito max-lg:text-sm">{{
														field.label
													}}</label>
												<p v-if="errors[field.name]" class="text-red-500 text-sm">{{
													errors[field.name] }}</p>
											</div>
										</template>
										<template v-else-if="field.fieldType === 'phone'">
											<div class="form__group field">
												<input type="tel" :id="field.name" v-model="formData[field.name]"
													:required="field.required" :placeholder="field.label"
													:class="{ 'border-red-500': errors[field.name] }"
													class="form-input form__field"
													@focus="addCountryPrefix(field.name)" />
												<label :for="field.name"
													class="form__label font-nunito max-lg:text-sm">{{
														field.label
													}}</label>
												<p v-if="errors[field.name]" class="text-red-500 text-sm">{{
													errors[field.name] }}</p>
											</div>
										</template>
										<template v-else-if="field.fieldType === 'dropdown'">
											<div class="form__group field select custom-select">
												<select :id="field.name" v-model="formData[field.name]"
													:required="field.required"
													:class="{ 'border-red-500': errors[field.name] }"
													:placeholder="field.label"
													class="form__select form__field focus:outline-none mt-4">
													<option v-for="option in field.options" :key="option.value"
														:value="option.value"
														class="[.is-windows_&]:bg-black [.is-windows_&]:text-nude-8 [.is-windows_&]:font-light">
														{{ option.label }}
													</option>
												</select>
												<label :for="field.name"
													class="form__label font-nunito max-lg:text-sm">{{
														field.label
													}}</label>
												<p v-if="errors[field.name]" class="text-red-500 text-sm">{{
													errors[field.name] }}</p>
											</div>

											<div v-for="subField in field.dependentFields"
												:key="subField.dependentField.name"
												:class="{ 'hidden': !shouldShowDependentField(subField) }">
												<div class="form__group field select custom-select">
													<select :id="subField.dependentField.name"
														v-model="formData[subField.dependentField.name]"
														:required="shouldShowDependentField(subField) && subField.dependentField.required"
														:class="{ 'border-red-500': errors[subField.dependentField.name] }"
														:placeholder="subField.dependentField.label"
														class="form__select form__field focus:outline-none mt-4">
														<option v-for="option in subField.dependentField.options"
															:key="option.value" :value="option.value"
															class="[.is-windows_&]:bg-black [.is-windows_&]:text-nude-8 [.is-windows_&]:font-light">
															{{ option.label }}
														</option>
													</select>
													<label :for="subField.dependentField.name"
														class="form__label font-nunito max-lg:text-sm">{{
															subField.dependentField.label }}</label>
													<p v-if="errors[subField.dependentField.name]"
														class="text-red-500 text-sm">{{
															errors[subField.dependentField.name] }}</p>
												</div>
											</div>
										</template>
										<template v-if="field && field.hidden">
											<template v-if="field.fieldType === 'single_line_text'">
												<div class="form__group field hidden">
													<input type="hidden" :id="field.name" v-model="utmData[field.name]"
														:placeholder="field.label"
														:class="{ 'border-red-500': errors[field.name] }"
														class="form-input form__field" />
												</div>
											</template>
											<template v-if="field.fieldType === 'single_checkbox'">
												<div class="form__group field hidden">
													<input type="hidden" :id="field.name" v-model="utmData[field.name]"
														:placeholder="field.label"
														:class="{ 'border-red-500': errors[field.name] }"
														class="form-input form__field" />
												</div>
											</template>
										</template>
									</div>
								</template>
							</template>
						</template>
						<div v-if="group.richText" v-html="group.richText"></div>
					</div>

					<!-- Renderizar Checkboxes de Consentimiento -->
					<div v-if="formStructure.legalConsentOptions" class="mt-8">
						<div v-if="formStructure.legalConsentOptions.consentToProcessCheckboxLabel">
							<label :class="{ 'text-red-500': errors.consent }" class="flex gap-3">
								<input class="!size-4" type="checkbox" v-model="formData.consent" :required="true" />
								<span v-html="formStructure.legalConsentOptions.consentToProcessCheckboxLabel"
									class="[&>p]:text-sm [&>p]:w-full [&>p]:mb-0"></span>
							</label>
							<p v-if="errors.consent" class="text-red-500 text-sm">{{ errors.consent }}</p>
						</div>
						<div v-for="checkbox in formStructure.legalConsentOptions.communicationsCheckboxes"
							:key="checkbox.subscriptionTypeId" class="mt-2">
							<label :class="{ 'text-red-500': errors[checkbox.subscriptionTypeId] }" class="flex gap-3">
								<input class="!size-4" type="checkbox" v-model="formData[checkbox.subscriptionTypeId]"
									:required="checkbox.required" />
								<span v-html="checkbox.label"
									class="text-sm w-full [&>p]:text-sm [&>p]:w-full [&>p]:mb-0 [&>p>a]:font-normal"></span>
							</label>
							<p v-if="errors[checkbox.subscriptionTypeId]" class="text-red-500 text-sm">{{
								errors[checkbox.subscriptionTypeId] }}</p>
						</div>
					</div>

				</div>

				<!-- Botón anterior -->
				<div class="flex justify-center">
					<button type="submit" class="button btn-blue">Enviar</button>
				</div>

			</form>

		</div>
	</div>
	<div v-else>
		<p>Loading...</p>
	</div>
</template>

<style scoped>
	@media (pointer: coarse) and (hover: none) {
		.left-image {
			display: none;
		}
	}

	.slide.fade-move {
		@apply !relative;
	}

	label {
		margin-top: 1em;
		color: #ffffff;
	}

	.button {
		@apply mt-8 bg-gold-2 text-blue-1 uppercase font-normal p-2 rounded-full cursor-pointer animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running] pt-3 pb-2 px-4;
	}

	.btn-blue {
		@apply mt-8 bg-blue-4 text-nude-8 text-sm uppercase font-normal p-2 rounded-full cursor-pointer pt-2 pb-1 px-6 hover:bg-blue-6 transition-colors;
	}

	.form-landing {

		input,
		select {
			@apply w-full flex py-2 px-4 text-white bg-transparent border-b border-b-white/30 pointer-events-auto;
		}
	}

	.form__group {
		@apply relative pt-5 w-full;
	}

	.form__field {
		@apply border-t-0 border-x-0 border-b border-b-white/30 w-full outline-0 text-white py-2 bg-transparent transition-[border-color];
	}

	.form__group:has(.form-check:nth-of-type(4)) .form-check {
		@apply lg:w-[calc((100%/4)-1.15rem)]
	}

	.form__field::placeholder {
		@apply text-transparent opacity-0;
	}

	.form__field:placeholder-shown~.form__label {
		@apply cursor-text top-4;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
		-webkit-text-fill-color: #ffffff;
		-webkit-box-shadow: 0 0 0px 1000px #1C2C44 inset;
		transition: background-color 5000s ease-in-out 0s;
	}

	.form__label {
		@apply absolute -top-3 block transition-all text-nude-8 pointer-events-none;
	}

	.form__field:focus {
		@apply pb-2 border-b-2;
		border-image: linear-gradient(to right, #e2d9bf, #908057);
		border-image-slice: 1;
	}

	.form__field:focus~.form__label {
		@apply text-nude-1 transition-all block absolute -top-3;
	}

	.select .form__label {
		@apply top-6;
	}

	.form__select:focus~.form__label,
	.form__select:has(> option:checked:not([value=""]))~.form__label {
		@apply -top-1 text-nude-1;
	}

	/* reset input */
	.form__field:required,
	.form__field:invalid {
		@apply shadow-none;
	}

	.form-check-label {
		@apply bg-cover bg-center outline outline-4 outline-offset-8 outline-transparent rounded-lg text-clamp-xs transition-all hover:outline-gold-2 text-center leading-none;
	}

	.form-check-input:checked+.form-check-label {
		@apply outline-gold-2;
	}

	.instagram {
		background-image: url("/images/quiz/instagram.webp");
	}

	.tiktok {
		background-image: url("/images/quiz/tiktok.webp");
	}

	.facebook {
		background-image: url("/images/quiz/facebook.webp");
	}

	.youtube {
		background-image: url("/images/quiz/youtube.webp");
	}

	.google {
		background-image: url("/images/quiz/xplorer.webp");
	}

	.amigo-a-y-familiares {
		background-image: url("/images/quiz/familia-amigos.webp");
	}

	.nuestras-clínicas-fisicas {
		background-image: url("/images/quiz/clinicas.webp");
	}
</style>
