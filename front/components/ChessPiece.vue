<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import type { ICell } from '~/types/board'

const props = defineProps<{
    color: string
    type: string
    selected?: boolean
    cell?: ICell
}>()

const boardStore = useBoardStore()
</script>

<template>
    <transition name="slide" appear>
        <div
            class="piece-container"
            :class="{ selected: props.selected }"
            @click="boardStore.selectOrigin(props.cell)"
        >
            <img
                class="piece"
                :src="`/img/pieces/${props.type}_${props.color}.svg`"
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
