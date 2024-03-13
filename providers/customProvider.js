// ~/providers/customProvider.js
import { joinURL } from 'ufo'
import { createOperationsGenerator } from '#image'

const operationsGenerator = createOperationsGenerator();
const getImage = (src, { modifiers = {}, baseURL } = {}) => {

  if (!baseURL) {
    // también soporta configuración en tiempo de ejecución
    baseURL = useRuntimeConfig().public.siteUrl;
  }

  const operations = operationsGenerator(modifiers);

  return {
    url: joinURL(baseURL, src + (operations ? '?' + operations : '')),
  }
}

module.exports = { getImage };
