<!-- <script setup lang="ts">
import { useGameStore } from '~/stores/game'

const game = useGameStore()
</script>

<template>
  <div relative>
    <Board :board="game.remoteGame.board" :score="game.remoteGame.score" />
  </div>
</template> -->

<script setup lang="ts">
import Scrim from './Scrim.vue'
import { useGameStore } from '~/stores/game'

const { play } = useFireworks()

const game = useGameStore()
const showWonState = ref(false)

game.localGame.onWon(() => {
  play()
  showWonState.value = true
})
</script>

<template>
  <div op50 filter-grayscale-100>
    <RemoateGameStatus mb-2 />
    <div relative>
      <Board :board="game.localGame.board" :score="game.remoteGame.score" />
    </div>
  </div>
</template>
