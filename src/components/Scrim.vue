<script setup lang="ts">
defineProps<{
  hide: boolean
}>()
</script>

<template>
  <div
    absolute
    inset-0 bg-black z-5 rounded-md
    bg-opacity-50 backdrop-blur-sm
    grid place-content-center place-items-center gap-4
    transition-opacity
    opacity-0
    pointer-events-none
    :class="{
      '!pointer-events-auto !opacity-100': !hide,
    }"
  >
    <slot />
  </div>
</template>
