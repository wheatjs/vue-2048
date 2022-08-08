<script setup lang="ts">
defineProps<{
  primary: boolean
}>()
</script>

<template>
  <button
    h-10
    border-1 border-border
    bg-secondary
    rounded-full
    font-bold
    text-lg
    px-4
    :class="{
      '!bg-accent-500 !border-accent-300 text-dark-900/70': primary,
    }"
  >
    <slot />
  </button>
</template>
