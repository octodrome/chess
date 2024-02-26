<script setup lang="ts">
import { useBoardStore } from "~~/stores/boardStore";
import { useLayoutStore } from "~~/stores/layoutStore";

const boardStore = useBoardStore();
const layoutStore = useLayoutStore();

onMounted(() => {
  layoutStore.closeRightDrawer();
  boardStore.initEmptyBoard();
});
</script>

<template>
  <BoardContainer :board="boardStore.board" />
</template>