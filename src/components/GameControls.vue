<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const game = useGameStore()

const score = useTransition(computed(() => game.localGame.score), {
  duration: 100,
})
</script>

<template>
  <div flex max-w="600px" w-full mx-auto>
    <div text-left self-end>
      <div lt-md:text-7xl text-8xl font-black font-mono text-light-800 leading-18>
        {{ score.toFixed(0) }}
      </div>
      <div text-3xl font-mono op50>
        Score
      </div>
      <div op50>
        Join the tiles, get to 2048!
      </div>
    </div>

    <span flex-1 />
    <div flex flex-col>
      <div text-right op50 font-medium font-mono text-xl>
        <div text-2xl>
          {{ game.highScore }}
        </div>
        <div text-base op70>
          High Score
        </div>
      </div>
      <span flex-1 />
      <div flex flex-row lt-md:flex-col>
        <button bg-secondary md:mr-2 lt-md="mt-4 mb-2" border-border border-1 rounded-full px-4 h-10 font-bold text-lg self-end @click="game.isMultiplayer = true">
          {{ game.isMultiplayer ? 'End Session' : 'Multiplayer' }}
        </button>
        <button bg="#42b883" text="#213547" border-1 border="#5dffb6" rounded-full px-4 h-10 font-bold text-lg self-end @click="game.newGame">
          New Game
        </button>
      </div>
    </div>
  </div>
</template>
