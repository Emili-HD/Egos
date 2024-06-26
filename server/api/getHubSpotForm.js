// server/api/getHubSpotForm.js
import { Client } from '@hubspot/api-client'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const formId = query.formId

  // Configura el cliente de HubSpot
  const hubspotClient = new Client({
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN
  })

  try {
    const apiResponse = await hubspotClient.marketing.forms.formsApi.getById(formId)
    return {
      success: true,
      data: apiResponse
    }
  } catch (e) {
    return {
      success: false,
      message: e.message,
      error: e.response ? e.response.data : null
    }
  }
})
