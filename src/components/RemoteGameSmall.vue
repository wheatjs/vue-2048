<script setup lang="ts">
import Spinner from './Spinner.vue'
import { useGameStore } from '~/stores/game'

const game = useGameStore()
</script>

<template>
  <div fixed top-0 left-0 right-0 p-4 flex flex-row place-items-center>
    <div bg-dark-200 rounded mx-auto class="gt-lg:hidden" shadow-lg p2 flex flex-row>
      <template v-if="!game.isWaitingForOtherPlayer">
        <Tile :value="game.remoteGame.largestTile" w-14 h-14 op50 filter-grayscale-100>
          {{ game.remoteGame.largestTile }}
        </Tile>
        <div flex flex-col pl-2 justify-center>
          <span text-lg font-medium>
            Opponent
          </span>
          <span mt="-1" op50>
            Score: {{ game.remoteGame.score }}
          </span>
        </div>
      </template>
      <template v-else>
        <div p-2 flex flex-row items-center>
          <Spinner w-6 h-6 />
          <span>
            Waiting for other player...
          </span>
          <CopyLink ml-2 />
        </div>
      </template>
    </div>
  </div>
</template>
