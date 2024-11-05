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
        return moment(humanGameStore.currentGame.CreatedAt).fromNow()
    else return moment(computerGameStore.currentGame?.createdAt).fromNow()
})
</script>

<template>
    <div>
        <div class="mt-4 ml-4 mb-2">Started {{ gameStartedSince }}</div>

        <div class="mt-4 ml-4 mb-2">
            {{ $t('gameInfos.round') }} {{ boardStore.round }}
        </div>

        <div class="mt-4 ml-4 mb-2">
            <span v-if="boardStore.hasToPlay === 'black'">
                {{ $t('gameInfos.blackToPlay') }}
            </span>
            <span v-if="boardStore.hasToPlay === 'white'">
                {{ $t('gameInfos.whiteToPlay') }}
            </span>
        </div>
    </div>
</template>
