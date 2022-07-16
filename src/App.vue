<script setup lang="ts">
import { useGameStore } from './stores/game'

const game = useGameStore()
</script>

<template>
  <main h-screen flex flex-col bg-primary text-foreground>
    <div p-4 grid h-full place-items-center>
      <div v-auto-animate="{ duration: 100 }" grid :class="{ 'grid-cols-2': game.isMultiplayer }" grid-cols-1 gap-4 place-content-center max-w="1200px" w-full mx-auto>
        <div max-w="600px" mx-auto w-full>
          <LocalGame />
          <div v-if="game.isMultiplayer" font-bold text-center text-2xl mt-4>
            You
          </div>
        </div>
        <div v-if="game.isMultiplayer">
          <RemoteGame />
          <div font-bold text-center text-2xl mt-4>
            Opponent
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

