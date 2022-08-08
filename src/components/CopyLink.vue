<script setup lang="ts">
import { useGameStore } from '~/stores/game'
const { copy } = useClipboard()

const didCopy = ref(false)

const game = useGameStore()
const copyLink = () => {
  copy(game.link)
    .then(() => {
      didCopy.value = true
      setTimeout(() => {
        didCopy.value = false
      }, 1500)
    })
}
</script>

<template>
  <div>
    <button flex flex-row place-items-center place-content-center w-7 h-7 rounded @click="copyLink">
      <i :class="{ 'i-carbon-copy': !didCopy, 'i-carbon-checkmark text-green-500': didCopy }" />
    </button>
  </div>
</template>
