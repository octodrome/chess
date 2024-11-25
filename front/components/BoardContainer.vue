<script setup lang="ts">
import type { ICell } from '~/types/board'
import { useBoardStore } from '~/stores/boardStore'

const props = defineProps<{
    board: ICell[][]
}>()

const boardStore = useBoardStore()
</script>

<template>
    <div class="board-container">
        <CapturedPiecesArea side="opponent" />

        <HasToPlayLine
            side="opponent"
            :is-checked="boardStore.isOpponentKingChecked"
            :is-check-mated="false"
        />

        <ChessBoard :board="props.board" />

        <HasToPlayLine
            :is-checked="boardStore.isPlayerKingChecked"
            :is-check-mated="false"
            side="player"
        />

        <CapturedPiecesArea side="player" />
    </div>
</template>

<style scoped lang="scss">
.board-container {
    height: 400px;
    width: 400px;
    max-width: 100vw;
    max-height: 100vw;
    position: relative;
}
</style>
