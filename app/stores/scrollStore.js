// stores/scrollStore.js
import { defineStore } from 'pinia';

export const useScrollStore = defineStore('scrollStore', {
  state: () => ({
    scrollToForm: false
  }),
  actions: {
    setScrollToForm(value) {
      this.scrollToForm = value;
    }
  }
});
