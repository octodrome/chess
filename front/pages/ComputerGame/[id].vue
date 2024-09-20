<script setup lang="ts">
import { useComputerGameStore } from '~/stores/computerGameStore'
import { useBoardStore } from '~/stores/boardStore'

const route = useRoute()
const computerGameStore = useComputerGameStore()
const boardStore = useBoardStore()

onMounted(() => computerGameStore.getGame(route.params.id as string))
</script>

<template>
    <BoardContainer :board="boardStore.board" />
</template>
