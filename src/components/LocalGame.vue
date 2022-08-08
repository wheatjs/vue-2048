<script setup lang="ts">
import { SwipeDirection } from '@vueuse/core'
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

const board = ref<HTMLElement>()

const { play } = useFireworks()

const { direction } = useSwipe(board, {
  threshold: 10,
})

const game = useGameStore()
const showWonState = ref(false)

watch(direction, () => {
  if (direction.value === SwipeDirection.UP)
    game.localGame.up()

  if (direction.value === SwipeDirection.DOWN)
    game.localGame.down()

  if (direction.value === SwipeDirection.LEFT)
    game.localGame.left()

  if (direction.value === SwipeDirection.RIGHT)
    game.localGame.right()
})

game.localGame.onWon(() => {
  play()
  showWonState.value = true
})

watch(() => game.localGame.hasWon, () => {
  if (!game.localGame.hasWon)
    showWonState.value = false
})

const canMove = computed(() => {
  if (showWonState.value)
    return false

  if (game.localGame.isGameOver)
    return false

  if (game.remoteGame.hasWon)
    return false

  return true
})

onKeyStroke(['ArrowUp', 'w'], () => {
  if (!canMove.value)
    return

  game.localGame.up()
  emit('up')
})

onKeyStroke(['ArrowDown', 's'], () => {
  if (!canMove.value)
    return

  game.localGame.down()
  emit('down')
})

onKeyStroke(['ArrowLeft', 'a'], () => {
  if (!canMove.value)
    return

  game.localGame.left()
  emit('left')
})

onKeyStroke(['ArrowRight', 'd'], () => {
  if (!canMove.value)
    return

  game.localGame.right()
  emit('right')
})
</script>

<template>
  <div>
    <GameControls mb-2 />
    <div relative>
      <Scrim :hide="!(game.localGame.isGameOver || game.remoteGame.hasWon)">
        <div text-5xl font-black>
          Game Over
        </div>
        <Button @click="game.startNewGame()">
          Play Again
        </Button>
      </Scrim>
      <Scrim :hide="!showWonState">
        <div text-5xl font-black>
          You Won!
        </div>
        <Button v-if="!game.isMultiplayerGameOpen" @click="showWonState = false">
          Continue
        </Button>
        <Button v-else @click="game.startNewGame()">
          Play Again
        </Button>
      </Scrim>
      <div ref="board">
        <Board :board="game.localGame.board" :score="game.localGame.score" />
      </div>
    </div>
  </div>
</template>
