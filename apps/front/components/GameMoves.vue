<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'

const boardStore = useBoardStore()
</script>

<template>
    <div class="ml-4 text-slate-500 text-sm">
        <div
            v-for="(move, index) in boardStore.movesByRound"
            :key="index"
            :class="{
                'text-slate-200': index == boardStore.movesByRound.length - 1,
            }"
        >
            {{ index + 1 }}. {{ move }}
        </div>
    </div>
</template>
