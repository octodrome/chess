<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'

const boardStore = useBoardStore()
const moveColor = computed(
    () => (index: number) => (index % 2 === 0 ? 'white' : 'black')
)
</script>

<template>
    <div class="ml-4 white--text">
        <div v-for="(move, index) in boardStore.moves" :key="index">
            <BaseIcon name="brightness-1" :color="moveColor(index)" />
            {{ index + 1 }}. {{ move }}
        </div>
    </div>
</template>
