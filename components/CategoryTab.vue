<template>
  <div
    class="px-4 py-3 rounded-lg cursor-pointer transition-all duration-200"
    :class="[
      isActive ? `${category.color} text-white font-semibold` : 'hover:bg-gray-100 dark:hover:bg-gray-800',
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
defineProps({
  category: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

defineEmits(['select']);
</script>