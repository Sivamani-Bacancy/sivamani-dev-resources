<template>
  <div
    class="px-4 py-3 rounded-lg cursor-pointer transition-all duration-200"
    :class="[
      isActive 
        ? `${category.color} font-semibold shadow-md` 
          + (isDarkMode.isDark === true ? ' text-white' : ' text-black bg-white')
        : 'hover:bg-gray-100 text-gray-500',
    ]"
    @click="$emit('select', category.id)"
  >
    <div class="flex items-center gap-2">
      <span class="text-xl">{{ category.icon }}</span>
      <span>{{ category.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useThemeStore } from '~/store/theme';
import { useFavoritesStore } from '../store/favorites';


defineProps({
  category: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["select"]);

const isDarkMode = useThemeStore()
// Use the favorites store
const favoritesStore = useFavoritesStore();

// Compute if the link is in favorites
const isFavorite = computed(() => favoritesStore.getFavorites);
</script>
