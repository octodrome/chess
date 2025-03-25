<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'

const boardStore = useBoardStore()
const isAgainstHuman = computed(() => boardStore.opponent === 'human')
</script>

<template>
    <GameOpponentHuman v-if="isAgainstHuman" />
    <GameOpponentComputer v-else />
</template>
