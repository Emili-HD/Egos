// server/api/submitHubSpotForm.js
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // Verificar si el cuerpo de la solicitud se lee correctamente
    console.log('Body received from client:', JSON.stringify(body, null, 2))
    // const hubspotFormEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${body.portalId}/${body.formId}`
    const hubspotFormEndpoint = 'https://api.hsforms.com/submissions/v3/integration/submit/143602274/5c1f29ba-992b-4e66-8497-5afb2470bb64'

    const formDataFiltered = body.fields ? body.fields.map(field => ({
      name: field.name,
      value: field.value
    })) : []

    // Log del formData filtrado
    console.log('Filtered formData:', JSON.stringify(formDataFiltered, null, 2))

    const legalConsentOptions = body.legalConsentOptions ? {
      consentToProcess: body.legalConsentOptions.consentToProcess === true,
      text: body.legalConsentOptions.text,
      communications: Array.isArray(body.legalConsentOptions.communications)
        ? body.legalConsentOptions.communications.map(checkbox => ({
            value: checkbox.value === true,
            subscriptionTypeId: checkbox.subscriptionTypeId,
            text: checkbox.text
          }))
        : []
    } : undefined

    // Log del legalConsentOptions procesado
    console.log('Processed legalConsentOptions:', JSON.stringify(legalConsentOptions, null, 2))

    const submissionData = {
      fields: formDataFiltered,
      context: {
        hutk: '',
        pageUri: body.context?.pageUri || '',
        pageName: body.context?.pageName || ''
      },
      legalConsentOptions: legalConsentOptions ? { consent: legalConsentOptions } : undefined
    }

    // Log de los datos de envío a HubSpot
    console.log('Datos de envío a HubSpot:', JSON.stringify(submissionData, null, 2))

    const response = await fetch(hubspotFormEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionData)
    })

    const textResponse = await response.text()

    // Log de la respuesta sin procesar desde HubSpot
    console.log('Raw Response from HubSpot:', textResponse)

    try {
      const jsonResponse = JSON.parse(textResponse)

      if (!response.ok) {
        console.error('Error Response Data:', jsonResponse)
        throw new Error(jsonResponse.message || 'Error al enviar el formulario')
      }

      return { success: true, response: jsonResponse }
    } catch (e) {
      console.error('Response is not valid JSON:', textResponse)
      throw new Error('Response is not valid JSON')
    }
  } catch (e) {
    console.error('Error submitting form to HubSpot:', e.message)
    return { success: false, message: e.message }
  }
})
