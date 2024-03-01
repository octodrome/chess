<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import type { IOpponentType } from '~/types/board'

const props = defineProps<{
    side: IOpponentType
}>()

const boardStore = useBoardStore()
const capturedPieces = computed(() =>
    props.side === 'computer'
        ? boardStore.computerCapturedPieces
        : boardStore.playerCapturedPieces
)
</script>

<template>
    <div class="captured-pieces flex" :class="`captured-pieces--${props.side}`">
        <div v-for="(capturedPiece, index) in capturedPieces" :key="index">
            <ChessPiece
                :color="capturedPiece.color"
                :type="capturedPiece.type"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.captured-pieces {
    position: absolute;
    width: 100%;

    &--computer {
        top: -50px;
    }

    &--player {
        bottom: -50px;
    }
}
</style>
