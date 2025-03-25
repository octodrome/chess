<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useComputerGameStore } from '~/stores/computerGameStore'

const boardStore = useBoardStore()
const computerGameStore = useComputerGameStore()
const computerLevel = computed(() => computerGameStore.currentGame?.guest_level)
const computerName = computed(() => computerGameStore.currentGame?.guest_name)
const isComputerThinking = computed(() => !boardStore.playerHasToPlay)
</script>

<template>
    <div>
        <BaseDrawerItem
            :icon="isComputerThinking ? 'robot-angry' : 'robot'"
            :content="`${computerName} 🎖️${computerLevel}`"
        />
    </div>
</template>
