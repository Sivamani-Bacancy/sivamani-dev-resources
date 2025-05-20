import { defineStore } from 'pinia';

/**
 * Theme store to manage application theme state (dark/light mode)
 */
export const useThemeStore = defineStore('theme', {
  // State
  state: () => ({
    isDark: false,
  }),

  // Getters
  getters: {
    /**
     * Get current theme mode
     * @returns {string} - 'dark' or 'light'
     */
    currentTheme: (state) => state.isDark ? 'dark' : 'light',
  },

  // Actions
  actions: {
    /**
     * Initialize theme based on local storage or system preference
     */
    initTheme() {
      // Skip if not in browser context
      if (typeof window === 'undefined') return;

      // Check if user has a theme preference stored
      const savedTheme = localStorage.getItem('theme');
      
      // Set theme based on saved preference or system preference
      if (
        savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        this.isDark = true;
        this.applyTheme();
      } else {
        this.isDark = false;
        this.applyTheme();
      }
    },

    /**
     * Toggle between dark and light themes
     */
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
    },

    /**
     * Set specific theme
     * @param {string} theme - 'dark' or 'light'
     */
    setTheme(theme: 'dark' | 'light') {
      this.isDark = theme === 'dark';
      this.applyTheme();
    },

    /**
     * Apply current theme state to document and save to localStorage
     */
    applyTheme() {
      // Skip if not in browser context
      if (typeof window === 'undefined') return;

      if (this.isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  },
});
