import { defineStore } from 'pinia';

/**
 * Favorites store to manage user's favorite links
 */
export const useFavoritesStore = defineStore('favorites', {
  // State
  state: () => ({
    favorites: [] as string[], // Array of link IDs
  }),

  // Getters
  getters: {
    /**
     * Check if a link is in favorites
     */
    isFavorite: (state) => (linkId: string) => {
      return state.favorites.includes(linkId);
    },

    /**
     * Get all favorite link IDs
     */
    getFavorites: (state) => state.favorites,
    
    /**
     * Get count of favorites
     */
    getFavoritesCount: (state) => state.favorites.length,
  },

  // Actions
  actions: {
    /**
     * Initialize favorites from localStorage (attempt to migrate existing data)
     */
    initFavorites() {
      // Skip if not in browser context
      if (typeof window === 'undefined') return;

      try {
        // Try to load from localStorage to migrate existing data
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          this.favorites = JSON.parse(savedFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    },

    /**
     * Add a link to favorites
     */
    addFavorite(linkId: string) {
      if (!this.favorites.includes(linkId)) {
        this.favorites.push(linkId);
        this.saveFavorites();
      }
    },

    /**
     * Remove a link from favorites
     */
    removeFavorite(linkId: string) {
      const index = this.favorites.indexOf(linkId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        this.saveFavorites();
      }
    },

    /**
     * Toggle favorite status of a link
     */
    toggleFavorite(linkId: string) {
      if (this.isFavorite(linkId)) {
        this.removeFavorite(linkId);
      } else {
        this.addFavorite(linkId);
      }
    },

    /**
     * Save favorites to localStorage (as fallback)
     */
    saveFavorites() {
      // Skip if not in browser context
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }
  },

  // Enable data persistence
  persist: true,
});
