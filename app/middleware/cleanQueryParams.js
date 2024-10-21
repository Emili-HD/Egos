// middleware/cleanQueryParams.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath.includes('?')) {
    const [path] = to.fullPath.split('?');
    return navigateTo(path);
  }
});
