// stores/menu.js
import { defineStore } from 'pinia';
import { useFetch } from '#app';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isOpen: false,
    canOpen: true,
    menuData: null,
    menuError: null,
  }),
  actions: {
    toggleMenu(open) {
      this.isOpen = open;
    },
    disableOpenTemporarily() {
      this.canOpen = false;
      setTimeout(() => {
        this.canOpen = true;
      }, 300); // Deshabilitar la apertura por 0.3 segundos
    },
    async fetchMenu(menuName) {
      try {
        const { data, error } = await useFetch(`${process.env.JSON_URL}/menus/v1/menus/${menuName}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        this.menuData = data.value;
        this.menuError = error.value;
      } catch (error) {
        console.error('Fetch error: ', error);
        this.menuError = error;
      }
    },
  },
});
