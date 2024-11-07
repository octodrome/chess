<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useComputerGameStore } from '~/stores/computerGameStore'

const boardStore = useBoardStore()
const computerGameStore = useComputerGameStore()
const computerLevel = computed(
    () => computerGameStore.currentGame?.computerLevel
)
const computerName = computed(() => computerGameStore.currentGame?.computerName)
const isComputerThinking = computed(() => !boardStore.playerHasToPlay)
</script>

<template>
    <ul>
        <BaseDrawerItem
            :icon="isComputerThinking ? 'robot-angry' : 'robot'"
            :content="`${computerName} 🎖️${computerLevel}`"
        />
    </ul>
</template>
