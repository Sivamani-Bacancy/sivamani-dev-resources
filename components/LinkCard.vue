<template>
  <div class="card p-4 h-full flex flex-col">
    <h3 class="text-lg font-medium mb-2">{{ link.title }}</h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 flex-1 mb-4">{{ link.description }}</p>
    <div class="flex justify-between items-center mt-auto">
      <a
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary text-sm px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
      >
        <span>Visit</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
      <button 
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        @click="toggleFavorite"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5" 
          :class="isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'"
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
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  link: {
    type: Object,
    required: true
  }
});

const isFavorite = ref(false);

onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  isFavorite.value = favorites.includes(props.link.id);
});

function toggleFavorite() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (isFavorite.value) {
    const index = favorites.indexOf(props.link.id);
    if (index !== -1) {
      favorites.splice(index, 1);
    }
  } else {
    favorites.push(props.link.id);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  isFavorite.value = !isFavorite.value;
}
</script>