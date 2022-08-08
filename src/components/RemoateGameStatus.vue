<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const game = useGameStore()

const score = useTransition(computed(() => game.remoteGame.score), {
  duration: 100,
})
</script>

<template>
  <div flex max-w="600px" w-full mx-auto>
    <span flex-1 />
    <div text-left>
      <div text-8xl font-black font-mono text-light-800 leading-18 text-right>
        {{ score.toFixed(0) }}
      </div>
      <div text-3xl font-mono op50 text-right>
        Score
      </div>
      <div op50 text-right>
        Join the tiles, get to 2048!
      </div>
    </div>
  </div>
</template>
