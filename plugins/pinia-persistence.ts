import { defineNuxtPlugin, useCookie } from '#app';

/**
 * Plugin to handle Pinia state persistence
 */
export default defineNuxtPlugin((nuxtApp) => {
  // Add beforeNuxtReady hook to hydrate Pinia state from cookies if available
  nuxtApp.hook('app:beforeMount', () => {
    // If on client-side and we have persisted Pinia state in a cookie
    if (process.client) {
      const favoritesStore = useFavoritesStore();
      
      try {
        // Initialize favorites from Pinia state
        favoritesStore.initFavorites();
      } catch (error) {
        console.error('Error initializing favorites store:', error);
      }
    }
  });
});

import { useFavoritesStore } from '~/store/favorites';
