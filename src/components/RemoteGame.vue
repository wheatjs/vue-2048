<script setup lang="ts">
import CopyLink from './CopyLink.vue'
import Scrim from './Scrim.vue'
import { useGameStore } from '~/stores/game'

const { play } = useFireworks()

const input = ref<HTMLInputElement>()
const game = useGameStore()
const showWonState = ref(false)

game.localGame.onWon(() => {
  play()
  showWonState.value = true
})

const selectText = () => {
  setTimeout(() => {
    if (input.value)
      input.value.select()
  }, 10)
}
</script>

<template>
  <div>
    <RemoteGameStatus mb-2 op50 filter-grayscale-100 />
    <div relative>
      <Scrim :hide="!game.isWaitingForOtherPlayer">
        <div flex flex-row items-center>
          <Spinner w-6 h-6 />
          <span>
            Waiting for other player to connect...
          </span>
        </div>
        <div flex flex-row items-center bg-dark-500 border="1 dark-50" rounded h-8>
          <input ref="input" border="r-1 dark-100" h-full type="text" bg-transparent :value="game.link" px-2 text-sm outline="focus:none" @click="selectText" @focus="selectText">
          <CopyLink />
        </div>
        <div>
          <Button @click="game.closeMultiplayerGame()">
            Cancel
          </Button>
        </div>
      </Scrim>
      <Board :board="game.remoteGame.board" :score="game.remoteGame.score" op50 filter-grayscale-100 />
    </div>
  </div>
</template>
