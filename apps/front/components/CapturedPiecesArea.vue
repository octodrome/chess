<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'

const props = defineProps<{
    side: 'opponent' | 'player'
}>()

const boardStore = useBoardStore()
const capturedPieces = computed(() =>
    (props.side === 'opponent' && boardStore.playerColor === 'white') ||
    (props.side === 'player' && boardStore.playerColor === 'black')
        ? boardStore.guestCapturedPieces
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

    &--opponent {
        top: -50px;
    }

    &--player {
        bottom: -50px;
    }
}
</style>
