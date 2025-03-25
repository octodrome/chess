<script setup lang="ts">
import { useBoardStore } from '~~/stores/boardStore'
import { useLayoutStore } from '~~/stores/layoutStore'

const boardStore = useBoardStore()
const layoutStore = useLayoutStore()

onMounted(() => {
    boardStore.initEmptyBoard()
})
</script>

<template>
    <div class="flex flex-col justify-between items-center h-[200px]">
        <div class="flex justify-center items-center">
            <NuxtImg
                src="/img/pieces/knight_black.svg"
                width="112px"
                height="122px"
                class="mx-[-10px]"
                alt="NuxtChess Logo"
                preload
            />
            <h1 class="text-5xl font-black">
                <span>Nuxt</span>
                <br />
                <span class="text-green-700">Chess</span>
            </h1>
        </div>

        <BaseButton
            @click="layoutStore.openModal('NewGameComputer')"
            type="text"
            >{{ $t('options.newComputerGame') }}</BaseButton
        >
    </div>
</template>
