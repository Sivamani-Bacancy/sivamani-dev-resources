<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <header class="sticky top-0 bg-white dark:bg-gray-900 shadow-sm backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 z-10">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <img src="https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Logo" class="w-8 h-8 rounded-md" />
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">Dev Resources Hub</h1>
        </div>
        <div class="flex items-center gap-4">
          <button 
            class="text-sm flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            @click="showFavorites = !showFavorites"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4" 
              :class="showFavorites ? 'text-yellow-500 fill-yellow-500' : ''"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
              />
            </svg>
            <span>{{ showFavorites ? 'All Resources' : 'Favorites' }}</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="container mx-auto px-6 py-8">
      <SearchBar v-model="searchQuery" />

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Categories sidebar -->
        <div class="md:col-span-3 space-y-2">
          <div class="sticky top-24">
            <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Categories</h2>
            <div class="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto no-scrollbar pb-4">
              <CategoryTab
                v-for="category in categories"
                :key="category.id"
                :category="category"
                :is-active="selectedCategory === category.id"
                @select="setCategory"
              />
            </div>
          </div>
        </div>

        <!-- Links grid -->
        <div class="md:col-span-9">
          <Transition name="tab-transition" mode="out-in">
            <div v-if="filteredLinks.length > 0">
              <div class="mb-6 flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ currentCategoryName }} 
                  <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ filteredLinks.length }} resources)</span>
                </h2>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <LinkCard v-for="link in filteredLinks" :key="link.id" :link="link" />
              </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No resources found</h3>
              <p class="text-gray-500 dark:text-gray-400">
                {{ searchQuery ? 'Try a different search term or category.' : 'Select a category to see resources.' }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </main>

    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dev Resources Hub</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              A curated collection of useful tools and resources for developers
            </p>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Siva Mani Munaga. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { categories } from './data/categories';
import { links } from './data/links';
import CategoryTab from './components/CategoryTab.vue';
import LinkCard from './components/LinkCard.vue';
import SearchBar from './components/SearchBar.vue';
import ThemeToggle from './components/ThemeToggle.vue';

const searchQuery = ref('');
const selectedCategory = ref('color-tools'); // Default category
const showFavorites = ref(false);
const favoriteLinkIds = ref([]);

onMounted(() => {
  // Load favorites from localStorage
  favoriteLinkIds.value = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // Watch for changes to favorites
  window.addEventListener('storage', (event) => {
    if (event.key === 'favorites') {
      favoriteLinkIds.value = JSON.parse(event.newValue || '[]');
    }
  });
});

// Set active category
const setCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};

// Get the current category name
const currentCategoryName = computed(() => {
  if (showFavorites.value) return 'Favorites';
  const category = categories.find(c => c.id === selectedCategory.value);
  return category ? category.name : '';
});

// Filter links based on search query, category, and favorites
const filteredLinks = computed(() => {
  let filtered = links;
  
  // Filter by favorites if showing favorites
  if (showFavorites.value) {
    filtered = filtered.filter(link => favoriteLinkIds.value.includes(link.id));
  } 
  // Otherwise filter by category
  else {
    filtered = filtered.filter(link => link.categoryId === selectedCategory.value);
  }
  
  // Additionally filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(link => 
      link.title.toLowerCase().includes(query) || 
      link.description.toLowerCase().includes(query)
    );
  }
  
  return filtered;
});
</script>