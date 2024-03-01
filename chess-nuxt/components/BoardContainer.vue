<script setup lang="ts">
import type { ICell } from '~/types/board'
import { useBoardStore } from '~/stores/boardStore'

defineProps<{
    board: ICell[][]
}>()

const boardStore = useBoardStore()
</script>

<template>
    <div class="board-container">
        <CapturedPiecesArea side="computer" />

        <HasToPlayLine
            color="black"
            :is-checked="boardStore.isOpponentKingChecked"
            :is-check-mated="false"
        />

        <ChessBoard :board="board" />

        <HasToPlayLine
            :is-checked="boardStore.isPlayerKingChecked"
            :is-check-mated="false"
            color="white"
        />

        <CapturedPiecesArea side="player" />
    </div>
</template>

<style scoped lang="scss">
.board-container {
    height: 400px;
    width: 400px;
    position: relative;
}
</style>
