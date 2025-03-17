<template>
    <div v-if="!isLoading && formStructure && formStructure.fieldGroups" :id="props.identificador"
        class="form-landing max-w-[clamp(320px,_40vw,_650px)] w-full m-auto xl:sticky xl:top-32">
        <form @submit.prevent="handleSubmit" class="flex flex-col py-8 lg:px-8 rounded-2xl">
            <div v-for="group in formStructure.fieldGroups" :key="group.richText"
                class="[&_br]:hidden [&_h2]:font-lora [&_h2]:!text-clamp-lg [&_h2]:font-normal [&_h2]:text-center [&_h2]:text-balance [html:not(.blackfriday).estetica_&_h2]:text-vermell [html:not(.blackfriday).estetica_&_h2_span]:!text-[#e6450f] [.blackfriday_&_h2]:text-crema">
                <template v-if="group.fields && Array.isArray(group.fields)">
                    <template v-for="field in group.fields" :key="field.name">
                        <template v-if="field && !field.hidden">
                            <div class="mb-0">
                                <template v-if="field.fieldType === 'single_line_text'">
                                    <div class="form__group field flex flex-col xl:flex-row xl:items-center">
                                        <label :for="field.name" class="form__label w-52 2xl:w-64">{{ field.label }}</label>
                                        <input type="text" :id="field.name" v-model="formData[field.name]"
                                            :required="field.required" :placeholder="field.label"
                                            :class="{ 'border-red-500': errors[field.name] }"
                                            class="form-input form__field" />
                                        <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name]
                                            }}</p>
                                    </div>
                                </template>
                                <template v-else-if="field.fieldType === 'email'">
                                    <div class="form__group field flex flex-col xl:flex-row xl:items-center">
                                        <label :for="field.name" class="form__label w-52 2xl:w-64">{{ field.label }}</label>
                                        <input type="email" :id="field.name" v-model="formData[field.name]"
                                            :required="field.required" :placeholder="field.label"
                                            :class="{ 'border-red-500': errors[field.name] }"
                                            class="form-input form__field" />
                                        <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name]
                                            }}</p>
                                    </div>
                                </template>

                                <!-- telèfon -->
                                <template v-else-if="field.fieldType === 'phone'">
                                    <div class="form__group field flex flex-col xl:flex-row xl:items-center">
                                        <label :for="field.name" class="form__label w-52 2xl:w-64">{{ field.label }}</label>
                                        <input type="tel" :id="field.name" v-model="formData[field.name]"
                                            :required="field.required" :placeholder="field.label"
                                            :class="{ 'border-red-500': errors[field.name] }"
                                            class="form-input form__field w-full"
                                            @focus="addCountryPrefix(field.name)" />
                                        <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name]
                                            }}</p>
                                    </div>
                                </template>

                                <!-- DROPDOWN -->
                                <template v-else-if="field.fieldType === 'dropdown'">
                                    <div class="form__group field flex flex-col xl:flex-row xl:items-center select custom-select">
                                        <label :for="field.name" class="form__label w-52 2xl:w-64">{{ field.label }}</label>
                                        <select :id="field.name" v-model="formData[field.name]"
                                            :required="field.required" :class="{ 'border-red-500': errors[field.name] }"
                                            :placeholder="field.label"
                                            class="form__select form__field focus:outline-none mt-2">
                                            <option v-for="option in field.options" :key="option.value"
                                                :value="option.value"
                                                class="[.is-windows_&]:text-black [.is-windows_&]:font-light">
                                                {{ option.label }}
                                            </option>
                                        </select>
                                        <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name]
                                            }}</p>
                                    </div>

                                    <div v-for="subField in field.dependentFields" :key="subField.dependentField.name"
                                        :class="{ 'hidden': !shouldShowDependentField(subField) }">
                                        <div class="form__group field flex flex-col xl:flex-row xl:items-center select custom-select">
                                            <label :for="subField.dependentField.name" class="form__label w-52 2xl:w-64">{{
                                                subField.dependentField.label }}</label>
                                            <select :id="subField.dependentField.name"
                                                v-model="formData[subField.dependentField.name]"
                                                :required="shouldShowDependentField(subField) && subField.dependentField.required"
                                                :class="{ 'border-red-500': errors[subField.dependentField.name] }"
                                                :placeholder="subField.dependentField.label"
                                                class="form__select form__field focus:outline-none mt-2">
                                                <option v-for="option in subField.dependentField.options"
                                                    :key="option.value" :value="option.value"
                                                    class="[.is-windows_&]:text-black [.is-windows_&]:font-light">
                                                    {{ option.label }}
                                                </option>
                                            </select>
                                            <p v-if="errors[subField.dependentField.name]" class="text-red-500 text-sm">
                                                {{ errors[subField.dependentField.name] }}</p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                        <template v-if="field && field.hidden">
                            <template v-if="field.fieldType === 'single_line_text'">
                                <div class="form__group field hidden">
                                    <input type="hidden" :id="field.name" v-model="utmData[field.name]"
                                        :required="field.required" :placeholder="field.label"
                                        :class="{ 'border-red-500': errors[field.name] }"
                                        class="form-input form__field" />
                                </div>
                            </template>
                            <template v-if="field.fieldType === 'single_checkbox'">
                                <div class="form__group field hidden">
                                    <input type="hidden" :id="field.name" v-model="utmData[field.name]"
                                        :required="field.required" :placeholder="field.label"
                                        :class="{ 'border-red-500': errors[field.name] }"
                                        class="form-input form__field" />
                                </div>
                            </template>
                        </template>
                    </template>
                </template>
                <div v-if="group.richText" v-html="group.richText"></div>
            </div>

            <!-- Renderizar Checkboxes de Consentimiento -->
            <div v-if="formStructure.legalConsentOptions" class="mt-4">
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

            <button type="submit" class="button">{{ submitButtonText }}</button>
        </form>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { useRouter } from 'vue-router'

    // Inicializar selectedCountry con el valor del prefijo telefónico de España
    const router = useRouter()

    const props = defineProps({
        portalId: {
            type: String,
            required: true
        },
        formId: {
            type: String,
            required: true
        },
        identificador: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        route: String,
    })

    const routePath = inject('routePath')

    // console.log('routePath:', routePath);
    

    const formData = ref({})
    const formStructure = ref(null)
    const isLoading = ref(true)
    const errors = ref({})
    const submitButtonText = ref('Enviar')
    const dependentFields = ref([])

    const loadFormStructure = async () => {
        await nextTick()
        isLoading.value = true // Iniciar el estado de carga

        try {
            const response = await $fetch(`/api/getHubSpotEstetica`, {
                params: { formId: props.formId }
            })

            if (!response || !response.data) {
                throw new Error('Invalid form data')
            }

            const formStructureData = response.data
            formStructure.value = formStructureData

            // console.log('Estetica Structure:', formStructure.value)

            formStructure.value.fieldGroups.forEach(group => {
                if (group.fields) {
                    group.fields.forEach(field => {
                        formData.value[field.name] = field.defaultValues ? field.defaultValues[0] : ''
                    })
                }
            })

            submitButtonText.value = formStructure.value.displayOptions?.submitButtonText || 'Enviar'

        } catch (e) {
            console.error('Error loading form structure:', e.message)
        } finally {
            isLoading.value = false // Finalizar el estado de carga
        }
    }

    // Datos reactivos
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
        await nextTick();
        errors.value = {};

        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        try {
            // Preparar las opciones de consentimiento legal
            const legalConsentOptions = formStructure.value.legalConsentOptions
                ? {
                    consentToProcess: true,
                    text: "I agree to allow Example Company to store and process my personal data.",
                    communications: Array.isArray(formStructure.value.legalConsentOptions.communicationsCheckboxes)
                        ? formStructure.value.legalConsentOptions.communicationsCheckboxes.map(checkbox => ({
                            value: !!formData.value[checkbox.subscriptionTypeId],
                            subscriptionTypeId: checkbox.subscriptionTypeId,
                            text: checkbox.label || ''
                        }))
                        : []
                }
                : undefined;

            // Filtrar y mapear los campos de formData
            const formDataFiltered = Object.keys(formData.value)
                .filter(key => key !== 'consent')
                .map(key => ({
                    name: key,
                    value: formData.value[key]
                }));

            // Añadir los campos UTM de utmData a formDataFiltered
            const utmFields = Object.keys(utmData).map(key => ({
                name: key,
                value: utmData[key]
            }));

            // Combinar formDataFiltered con los valores de UTM
            const combinedFields = [...formDataFiltered, ...utmFields];

            // Crear el objeto de datos que se enviará
            const submissionData = {
                fields: combinedFields,
                context: {
                    pageUri: window.location.href,
                    pageName: document.title
                },
                legalConsentOptions: legalConsentOptions ? { consent: legalConsentOptions } : undefined
            };

            // Enviar el formulario a HubSpot
            const hubspotFormEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${props.portalId}/${props.formId}`;

            const response = await fetch(hubspotFormEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });

            const textResponse = await response.text();

            try {
                const jsonResponse = JSON.parse(textResponse);

                if (!response.ok) {
                    console.error('Error Response Data:', jsonResponse);
                    throw new Error(jsonResponse.message || 'Error al enviar el formulario');
                }

                // Redirigir según la ruta actual a la página gracias o al calendario de bloome
                if (routePath && routePath.includes('/medicina-estetica/')) {
                    window.location.href = 'https://heybloome.com/calendarios/';
                } 
                else if (routePath && routePath.includes('/promocion/') && routePath.endsWith('-meta/')) {
                    // Redirigir a la página de "gracias-google"
                    await router.push('/gracias-meta/');
                }
                else if (routePath && routePath.includes('/promocion/')) {
                    // Redirigir a la página de "gracias-google"
                    await router.push('/gracias-google/');
                }
                else {
                    await router.push('/gracias/');
                }

            } catch (e) {
                console.error('Response is not valid JSON:', textResponse);
                throw new Error('Response is not valid JSON');
            }
        } catch (e) {
            console.error('Error submitting form:', e.message);
        }
    };


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

        await nextTick();  // Espera un ciclo de actualización si es necesario
        // console.log('Valores de formData asignados:', utmData);
    })

</script>

<style scoped>

    .blackfriday label, label{
        @apply text-crema/75 font-light;
    }
    html:not(.blackfriday).estetica label {
        @apply mt-4 text-vermell;
    }

    .button {
        @apply mt-8 bg-gold-2 text-nude-8 uppercase font-normal p-2 rounded-full cursor-pointer animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running] pt-3 pb-2 px-4 font-nunito;
    }

    .estetica:not(.blackfriday) .button {
        @apply !bg-vermell;
        background-image: none;
    }

    .estetica.blackfriday .button {
        @apply !bg-crema text-vermell;
        background-image: none;
    }

    html:not(.blackfriday) .form-landing {

        input,
        select {
            @apply w-full flex py-1 px-2 [.estetica_&]:text-vermell bg-transparent border-b [.estetica_&]:border-b-vermell/30 pointer-events-auto font-nunito;
        }
    }

    .form__group {
        @apply relative pt-3 w-full;
    }

    .blackfriday .form__field,
    .form__field {
        @apply border-t-0 border-x-0 border-b border-b-crema/30 w-full outline-0 text-crema py-2 bg-transparent transition-[border-color];
    }

    html:not(.blackfriday).estetica .form__field {
        @apply border-t-0 border-x-0 border-b border-b-vermell/30 w-full outline-0 text-vermell py-2 bg-transparent transition-[border-color];
    }

    .form__field::placeholder {
        @apply text-transparent opacity-0;
    }

    .form__field:placeholder-shown~.form__label {
        @apply cursor-text top-4;
    }

    /* input:-webkit-autofill,
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

    .estetica input:-webkit-autofill,
    .estetica input:-webkit-autofill:hover,
    .estetica input:-webkit-autofill:focus,
    .estetica textarea:-webkit-autofill,
    .estetica textarea:-webkit-autofill:hover,
    .estetica textarea:-webkit-autofill:focus,
    .estetica select:-webkit-autofill,
    .estetica select:-webkit-autofill:hover,
    .estetica select:-webkit-autofill:focus {
        -webkit-text-fill-color: #6D1636;
        -webkit-box-shadow: 0 0 0px 1000px #FFFFF0 inset;
        transition: background-color 5000s ease-in-out 0s;
    } */


    html:not(.blackfriday) .form__label {
        @apply relative block transition-all [.estetica_&]:text-vermell pointer-events-none font-nunito leading-none;
    }
    .blackfriday .form__label {
        @apply absolute -top-5 block transition-all text-crema pointer-events-none font-nunito;
    }

    .form__field:focus {
        @apply pb-2 border-b-2;
        border-image: linear-gradient(to right, #e2d9bf, #908057);
        border-image-slice: 1;
    }

    .blackfriday .form__field:focus~.form__label,
    .form__field:focus~.form__label {
        @apply text-crema transition-all block absolute -top-5;
    }

    html:not(.blackfriday).estetica .form__field:focus~.form__label {
        @apply text-vermell transition-all block absolute -top-5;
    }

    /* .select .form__label {
        @apply top-4;
    } */


    .form__select:focus~.form__label,
    .form__select:has(> option:checked:not([value=""]))~.form__label,
    .blackfriday .form__select:focus~.form__label,
    .blackfriday .form__select:has(> option:checked:not([value=""]))~.form__label {
        @apply -top-3 !text-crema;
    }

    html:not(.blackfriday).estetica .form__select:focus~.form__label,
    html:not(.blackfriday).estetica .form__select:has(> option:checked:not([value=""]))~.form__label {
        @apply -top-3 text-vermell;
    }

    /* reset input */
    .form__field:required,
    .form__field:invalid {
        @apply shadow-none;
    }
</style>
