<script setup lang="ts">
import type { ICellPosition } from 'chess-legal-moves/dist/types'
import { useBoardStore } from '~/stores/boardStore'

const props = defineProps<{
    color: string
    type: string
    selected?: boolean
    cell?: ICellPosition
}>()

const boardStore = useBoardStore()
const selectOrigin = () => {
    if (props.cell) boardStore.selectOrigin(props.cell)
}
</script>

<template>
    <transition name="slide" appear>
        <div
            class="piece-container"
            :class="{ selected: props.selected }"
            @click="selectOrigin"
        >
            <NuxtImg
                width="50px"
                height="50px"
                class="piece"
                :src="`/img/pieces/${props.type}_${props.color}.svg`"
                :alt="`${props.color} ${props.type}`"
                preload
            />
        </div>
    </transition>
</template>

<style scoped lang="scss">
.piece-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &.selected {
        background-color: #65d6a7;
    }

    .piece {
        width: 100%;
        height: 100%;

        &:hover {
            opacity: 0.5;
            cursor: pointer;
        }
    }
}

/* PIECES TRANSITIONS */
.slide-enter {
    opacity: 0;
}
.slide-enter-active {
    transition: all 0.4s ease;
}
</style>
