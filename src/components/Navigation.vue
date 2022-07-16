<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const game = useGameStore()
</script>

<template>
  <nav h-18>
    <div flex flex-row max-w="1200px" mx-auto h-full items-center gap-2>
      <div text-2xl font-bold font-mono flex-1>
        2048
      </div>

      <button i-carbon-friendship text-2xl @click="game.isMultiplayer = true" />
      <button i-carbon-settings text-2xl />
    </div>
  </nav>
</template>
