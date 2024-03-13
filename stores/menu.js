// stores/menu.js
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isOpen: false,
    canOpen: true,
  }),
  actions: {
    toggleMenu(open) {
      this.isOpen = open;
    },
    disableOpenTemporarily() {
      this.canOpen = false;
      setTimeout(() => {
        this.canOpen = true;
      }, 1000); // Deshabilitar la apertura por 1 segundo
    },
  },
});
