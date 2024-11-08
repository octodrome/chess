<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import moment from 'moment'

const boardStore = useBoardStore()
const humanGameStore = useHumanGameStore()
const computerGameStore = useComputerGameStore()

const gameStartedSince = computed(() => {
    if (humanGameStore.currentGame)
        return moment(humanGameStore.currentGame.created_at).fromNow()
    else return moment(computerGameStore.currentGame?.createdAt).fromNow()
})
</script>

<template>
    <div>
        <div class="mt-4 ml-4 mb-2">Started {{ gameStartedSince }}</div>
    </div>
</template>
