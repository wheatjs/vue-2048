<script setup lang="ts">
import Scrim from './Scrim.vue'
import { useGameStore } from '~/stores/game'
import { useFireworks } from '~/composables/useConfetti'

const emit = defineEmits<{
  (e: 'up'): void
  (e: 'down'): void
  (e: 'left'): void
  (e: 'right'): void
  (e: 'update:seed'): string
}>()

const { play } = useFireworks()

const game = useGameStore()
const showWonState = ref(false)

game.localGame.onWon(() => {
  play()
  showWonState.value = true
})

watch(() => game.localGame.hasWon, () => {
  if (!game.localGame.hasWon)
    showWonState.value = false
})

onKeyStroke(['ArrowUp', 'w'], () => {
  game.localGame.up()
  emit('up')
})

onKeyStroke(['ArrowDown', 's'], () => {
  game.localGame.down()
  emit('down')
})

onKeyStroke(['ArrowLeft', 'a'], () => {
  game.localGame.left()
  emit('left')
})

onKeyStroke(['ArrowRight', 'd'], () => {
  game.localGame.right()
  emit('right')
})
</script>

<template>
  <div>
    <GameControls mb-2 />
    <div relative>
      <Scrim :hide="!game.localGame.isGameOver">
        <div text-5xl font-black>
          Game Over
        </div>
        <button bg-white bg-opacity-5 h-10 px-4 rounded-full border-1 border-border font-black @click="game.newGame()">
          Play Again
        </button>
      </Scrim>
      <Scrim :hide="!showWonState">
        <div text-5xl font-black>
          You Won!
        </div>
        <button bg-white bg-opacity-5 h-10 px-4 rounded-full border-1 border-border font-black @click="showWonState = false">
          Continue
        </button>
      </Scrim>
      <Board :board="game.localGame.board" :score="game.localGame.score" />
    </div>
  </div>
</template>
