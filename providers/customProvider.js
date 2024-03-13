// ~/providers/customProvider.js
export default {
  getImage(src, { modifiers = {}, baseURL } = {}) {
    const url = new URL(src, baseURL);
    // Aquí puedes añadir lógica para modificar la URL según los modificadores
    return {
      url: url.href,
    };
  },
};
