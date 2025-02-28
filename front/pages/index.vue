<script setup lang="ts">
import { useBoardStore } from '~~/stores/boardStore'
import { useLayoutStore } from '~~/stores/layoutStore'

const boardStore = useBoardStore()
const layoutStore = useLayoutStore()

onMounted(() => {
    layoutStore.closeRightDrawer()
    boardStore.initEmptyBoard()
})
</script>

<template>
    <div class="flex flex-col justify-between items-center h-[200px]">
        <div class="flex justify-center items-center">
            <img
                src="/img/pieces/knight_black.svg"
                width="112px"
                class="mx-[-10px]"
            />
            <h1 class="text-5xl font-black">
                <span>Nuxt</span>
                <br />
                <span class="text-green-500">Chess</span>
            </h1>
        </div>

        <BaseButton
            @click="layoutStore.openModal('NewGameComputer')"
            type="text"
            >New Game VS Computer</BaseButton
        >
    </div>
</template>
