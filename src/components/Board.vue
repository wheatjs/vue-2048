<script setup lang="ts">
const props = defineProps<{ board: ([number, number] | null)[][]; score: number }>()
const items = computed(() => {
  return props.board.flat()
})
</script>

<template>
  <div bg-secondary aspect-ratio-1 rounded-lg p-4 relative>
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-else>
      <div
        :style="{
          gridTemplateColumns: `repeat(${props.board[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${props.board.length}, minmax(0, 1fr))`,
        }"
        top-0 left-0
        absolute
        grid
        gap="lg:4 2"
        w-full h-full p-4
      >
        <div v-for="i in items.length" :key="i" bg-primary rounded h-full />
      </div>
      <div
        v-auto-animate="{ duration: 100 }"
        grid
        :style="{
          gridTemplateColumns: `repeat(${props.board[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${props.board.length}, minmax(0, 1fr))`,
        }"
        gap="lg:4 2" relative h-full
      >
        <Tile
          v-for="(item, index) in items" :key="item ? item[1] : `null-${index}`"
          :class="{ 'not-empty': item, 'empty': !item }"
          :value="item ? item[0] : null"
          h-full
        >
          {{ item ? `${item[0]}` : '' }}
        </Tile>
      </div>
    </template>
  </div>
</template>
