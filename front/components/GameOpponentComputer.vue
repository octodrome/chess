<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import services from '~/services/index'

const boardStore = useBoardStore()
const computerGameStore = useComputerGameStore()
const computerLevel = computed(() => services.engine.computerLevel)
const computerName = computed(() =>
    computerGameStore.currentGame
        ? computerGameStore.currentGame.computerName
        : ''
)
const isComputerThinking = computed(() => !boardStore.playerHasToPlay)
</script>

<template>
    <ul>
        <BaseDrawerItem
            :icon="isComputerThinking ? 'robot-angry' : 'robot'"
            :content="`${computerName} #${computerLevel}`"
        />
    </ul>
</template>
