<script setup lang="ts">
import RemoteGameSmall from './components/RemoteGameSmall.vue'
import { useGameStore } from '~/stores/game'

const game = useGameStore()

const params = new URLSearchParams(window.location.search)
const gameId = params.get('game')

if (gameId)
  game.joinMultiplayerGame(gameId)
</script>

<template>
  <Navigation />
  <main h-screen flex flex-col bg-primary text-foreground select-none>
    <div p-4 grid h-full place-items-center>
      <div v-auto-animate="{ duration: 100 }" grid :class="{ 'lg:grid-cols-2': game.isMultiplayerGameOpen }" grid-cols-1 gap-4 place-content-center max-w="1200px" w-full mx-auto>
        <div max-w="600px" mx-auto w-full :class="{ 'lt-lg:pt-16': game.isMultiplayerGameOpen }">
          <LocalGame />
          <div v-if="game.isMultiplayerGameOpen" font-bold text-center text-2xl mt-4>
            You
          </div>
        </div>
        <template v-if="game.isMultiplayerGameOpen">
          <div class="lt-lg:hidden">
            <RemoteGame />
            <div font-bold text-center text-2xl mt-4>
              Opponent
            </div>
          </div>
          <RemoteGameSmall class="lg:hidden" />
        </template>
      </div>
    </div>
  </main>
</template>

