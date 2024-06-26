<template>
  <div
    :id="props.identificador"
    class="form-landing w-auto max-w-full"
    v-if="!isLoading && formStructure"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col p-4  form-after">
      <div v-for="group in formStructure.fieldGroups" :key="group.richText" class="[&_h2]:!text-clamp-lg [&_h2]:font-normal [&_h2]:text-center [&_h2]:text-balance">
        <template v-if="group.fields && Array.isArray(group.fields)">
          <template v-for="field in group.fields" :key="field.name">
            <template v-if="!field.hidden">
              <div class="mb-4">
                <template v-if="field.fieldType === 'single_line_text'">
                  <div class="form__group field">
                    <input
                      type="text"
                      :id="field.name"
                      v-model="formData[field.name]"
                      :required="field.required"
                      :placeholder="field.label"
                      :class="{ 'border-red-500': errors[field.name] }"
                      class="form-input form__field"
                    />
                    <label :for="field.name" class="form__label">{{ field.label }}</label>
                    <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name] }}</p>
                  </div>
                </template>
                <template v-else-if="field.fieldType === 'email'">
                  <div class="form__group field">
                    <input
                      type="email"
                      :id="field.name"
                      v-model="formData[field.name]"
                      :required="field.required"
                      :placeholder="field.label"
                      :class="{ 'border-red-500': errors[field.name] }"
                      class="form-input form__field"
                    />
                    <label :for="field.name" class="form__label">{{ field.label }}</label>
                    <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name] }}</p>
                  </div>
                </template>
                <template v-else-if="field.fieldType === 'phone'">
                  <div class="form__group field">
                    <input
                      type="tel"
                      :id="field.name"
                      v-model="formData[field.name]"
                      :required="field.required"
                      :placeholder="field.label"
                      :class="{ 'border-red-500': errors[field.name] }"
                      class="form-input form__field"
                    />
                    <label :for="field.name" class="form__label">{{ field.label }}</label>
                    <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name] }}</p>
                  </div>
                </template>
                <template v-else-if="field.fieldType === 'dropdown'">
                  <div class="form__group field select">
                    <select
                      :id="field.name"
                      v-model="formData[field.name]"
                      :required="field.required"
                      :class="{ 'border-red-500': errors[field.name] }"
                      :placeholder="field.label"
                      class="form__select form__field focus:outline-none mt-4"
                    >
                      <!-- <option value="" disabled selected class="!text-gray-300">Quiero mi cirugía en...</option> -->
                      <option v-for="option in field.options" :key="option.value" :value="option.value">
                        {{ option.label }}
                      </option>
                    </select>
                    <label :for="field.name" class="form__label">{{ field.label }}</label>
                    <p v-if="errors[field.name]" class="text-red-500 text-sm">{{ errors[field.name] }}</p>
                  </div>
                </template>
              </div>
            </template>
          </template>
        </template>
        <div v-if="group.richText" v-html="group.richText"></div>
      </div>

      <!-- Renderizar Checkboxes de Consentimiento -->
      <div v-if="formStructure.legalConsentOptions" class="mt-4">
        <div v-if="formStructure.legalConsentOptions.consentToProcessCheckboxLabel">
          <label :class="{ 'text-red-500': errors.consent }" class="flex gap-3">
            <input
              class="!size-4"
              type="checkbox"
              v-model="formData.consent"
              :required="true"
            />
            <span v-html="formStructure.legalConsentOptions.consentToProcessCheckboxLabel" class="[&>p]:text-sm [&>p]:w-full [&>p]:mb-0"></span>
          </label>
          <p v-if="errors.consent" class="text-red-500 text-sm">{{ errors.consent }}</p>
        </div>
        <div v-for="checkbox in formStructure.legalConsentOptions.communicationsCheckboxes" :key="checkbox.subscriptionTypeId" class="mt-2">
          <label :class="{ 'text-red-500': errors[checkbox.subscriptionTypeId] }" class="flex gap-3">
            <input
              class="!size-4"
              type="checkbox"
              v-model="formData[checkbox.subscriptionTypeId]"
              :required="checkbox.required"
            />
            <span v-html="checkbox.label" class="text-sm w-full"></span>
          </label>
          <p v-if="errors[checkbox.subscriptionTypeId]" class="text-red-500 text-sm">{{ errors[checkbox.subscriptionTypeId] }}</p>
        </div>
      </div>

      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

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
})

const formData = ref({})
const formStructure = ref(null)
const isLoading = ref(true)
const errors = ref({})
const submitButtonText = ref('Enviar')

const loadFormStructure = async () => {
  await nextTick()
  try {
    const { data, error } = await useFetch(`/api/getHubSpotForm`, {
      query: { formId: props.formId }
    })

    if (error.value) {
      throw new Error(error.value.message || 'Error fetching form structure')
    }

    if (data.value && data.value.data) {
      formStructure.value = data.value.data
      console.log('Form Structure:', formStructure.value)

      formStructure.value.fieldGroups.forEach(group => {
        if (group.fields) {
          group.fields.forEach(field => {
            formData.value[field.name] = field.defaultValues ? field.defaultValues[0] : ''
          })
        }
      })

      submitButtonText.value = formStructure.value.displayOptions?.submitButtonText || 'Enviar'
    } else {
      throw new Error('Invalid form data')
    }
  } catch (e) {
    console.error('Error loading form structure:', e.message)
  } finally {
    isLoading.value = false
  }
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

    const submissionData = {
      fields: formDataFiltered,
      context: {
        pageUri: window.location.href,
        pageName: document.title
      },
      legalConsentOptions: legalConsentOptions ? { consent: legalConsentOptions } : undefined
    }

    console.log('Datos de envío a HubSpot:', JSON.stringify(submissionData, null, 2))

    const hubspotFormEndpoint = 'https://api.hsforms.com/submissions/v3/integration/submit/143602274/5c1f29ba-992b-4e66-8497-5afb2470bb64'

    const response = await fetch(hubspotFormEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionData)
    })

    const textResponse = await response.text()

    console.log('Raw Response from HubSpot:', textResponse)

    try {
      const jsonResponse = JSON.parse(textResponse)

      console.log('Parsed Response from HubSpot:', jsonResponse)

      if (!response.ok) {
        console.error('Error Response Data:', jsonResponse)
        throw new Error(jsonResponse.message || 'Error al enviar el formulario')
      }

      // Redirigir a la URL de gracias
      router.push('/gracias')
    } catch (e) {
      console.error('Response is not valid JSON:', textResponse)
      throw new Error('Response is not valid JSON')
    }
  } catch (e) {
    console.error('Error submitting form:', e.message)
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
  const regex = /^\d{7,20}$/
  return regex.test(phone)
}

onMounted(async () => {
  await nextTick()
  await loadFormStructure()
})
</script>

<style scoped>

label {
  margin-top: 1em;
  color: #ffffff;
}
button {
  margin-top: 1em;
  background-color: #b4a984;
  color: white;
  padding: 0.5em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.form-landing {
  input, select {
    @apply w-full flex py-2 px-4 text-white bg-transparent  border-b border-b-white/30 pointer-events-auto;    
  }
}

.form__group {
  @apply relative pt-5 w-full;
}

.form__field {
  @apply border-t-0 border-x-0 border-b border-b-white/30 w-full outline-0 text-white py-2 bg-transparent transition-[border-color];
}

.form__field::placeholder {
  @apply text-transparent opacity-0;
}

.form__field:placeholder-shown ~ .form__label {
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

.form__field:focus ~ .form__label {
  @apply text-nude-1 transition-all block absolute -top-3;
}

.select .form__label {
  @apply top-6;
}

.form__select:focus ~ .form__label,
.form__select:has(> option:checked:not([value=""])) ~ .form__label {
  @apply -top-1 text-nude-1;
}
/* reset input */
.form__field:required, .form__field:invalid {
  @apply shadow-none;
}
</style>
