<script setup lang="ts">
const props = defineProps<{
  value: number | null
}>()

const color = computed(() => {
  if (!props.value)
    return ['transparent', 'transparent']

  const colors = {
    2: ['#f16528', 'white'], // HTML
    4: ['#edd51e', 'black'], // js
    8: ['#3592cb', 'white'], // css
    16: ['#f23901', 'white'], // Svelte
    32: ['#61dafb', '#13252a'], // React
    64: ['#4f82bf', 'white'], // Solid
    128: ['#ff4556', 'white'], // Angular
    256: ['#0963a3', 'white'], // jQuery
    512: ['rgb(255 208 40)', '#261f08'], // Vite
    1024: ['rgb(99 108 255)', '#fff'], // Vite
    2048: ['#40b883', '#34495e'], // Vue
    4096: ['#cb3837', 'white'], // NPM
    8192: ['#509640', 'white'], // Node,
    16384: ['#2f71ba', 'white'], // Typescript
    32768: ['white', 'black'],
    65536: ['black', 'white'],
  }

  if (props.value in colors)
    return (colors as any)[props.value]

  return ['transparent', 'transparent']
})
</script>

<template>
  <div
    text-dark-50
    rounded
    flex place-items-center place-content-center
    font-mono lt-md:text-3xl text-5xl font-black
    relative
    overflow-hidden
    :style="{
      'background-color': color[0],
      'color': color[1],
      'box-shadow': value && value >= 64 ? `0 0 10px 0px ${color[0]}` : 'none',
    }"
  >
    <div absolute inset-0 border="b-2 b-black b-opacity-10 r-2 r-white r-opacity-10" />
    <slot />
  </div>
</template>
