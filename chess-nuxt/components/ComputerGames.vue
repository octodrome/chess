<script setup lang="ts">
import { useBoardStore } from "~/stores/boardStore";
import { useComputerGameStore } from "~/stores/computerGameStore";
import type { IComputerGame } from "~/types/computerGame";

defineProps<{
  gameList: IComputerGame[];
}>();

const route = useRoute();
const boardStore = useBoardStore();
const computerGameStore = useComputerGameStore();

const goToGame = (gameId) => {
  if (route.params.id === gameId) return;
  boardStore.continueGame("computer");
  navigateTo({
    path: `/ComputerGame/${gameId}`,
  });
};

const deleteThisGame = (gameId) => {
  computerGameStore.deleteGame(gameId);
  if (route.params.id === gameId) navigateTo({ path: "/" });
};
</script>

<template>
  <ul v-if="gameList && gameList.length !== 0">
    <BaseDrawerItem
      v-for="game in gameList"
      :key="game.id"
      @click="goToGame(game.id)"
      icon="robot"
      :content="game.computerName"
      action="delete"
      @delete="deleteThisGame(game.id)"
    />
  </ul>
</template>