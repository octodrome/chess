<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import type { ICell } from '~/types/board'

const props = defineProps<{
    board: ICell[][]
}>()

const boardStore = useBoardStore()
</script>

<template>
    <div
        class="flex relative drop-shadow-lg"
        :class="{ 'flex-row-reverse': boardStore.playerColor === 'black' }"
    >
        <div
            v-for="(column, columnIndex) in props.board"
            :key="columnIndex"
            class="board-row"
            :class="{ 'row-from-black': boardStore.playerColor === 'black' }"
        >
            <div
                v-for="(cell, rowIndex) in column"
                :key="rowIndex"
                class="cell"
                :class="`cell--${cell.color}`"
            >
                <ChessPiece
                    v-if="cell.piece"
                    :color="cell.piece.color"
                    :type="cell.piece.type"
                    :selected="cell.piece.selected"
                    :cell="{ columnIndex, rowIndex }"
                />

                <div
                    v-if="cell.possibleDestination"
                    class="possible-destination"
                    @click="
                        boardStore.selectDestination({ columnIndex, rowIndex })
                    "
                />

                <div
                    v-if="cell.possibleKill"
                    class="possible-kill"
                    @click="
                        boardStore.selectDestination({ columnIndex, rowIndex })
                    "
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.board-row {
    display: flex;
    flex-direction: column-reverse;
}
.row-from-black {
    flex-direction: column;
}

.cell {
    height: 50px;
    width: 50px;
    max-width: calc(100vw / 8);
    max-height: calc(100vw / 8);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &--white {
        background-color: #e2d7d7;
    }
    &--black {
        background-color: #526670;
    }

    .possible-destination,
    .possible-kill {
        width: 97%;
        height: 97%;
        border-radius: 50%;

        &:hover {
            cursor: pointer;
        }
    }

    .possible-destination {
        background-color: #65d6a7;
        opacity: 0.5;

        &:hover {
            background-color: #4ea782;
        }
    }

    .possible-kill {
        position: absolute;
        background-color: #d34444;
        opacity: 0.5;

        &:hover {
            background-color: #b32f2f;
        }
    }
}
</style>
