<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import { useLayoutStore } from '~/stores/layoutStore'
import type { IComputerGame } from '~/types/computerGame'

const props = defineProps<{
    gameList: IComputerGame[]
}>()

const route = useRoute()
const boardStore = useBoardStore()
const computerGameStore = useComputerGameStore()
const layoutStore = useLayoutStore()

const goToGame = (gameId: string) => {
    if (route.params.id === gameId) return
    boardStore.continueGame('computer')
    navigateTo({
        path: `/ComputerGame/${gameId}`,
    })
}

const deleteThisGame = (gameId: string) => {
    layoutStore.openModal('Confirm', () => {
        computerGameStore.deleteGame(gameId)
        if (route.params.id === gameId) navigateTo({ path: '/' })
    })
}
</script>

<template>
    <ul v-if="props.gameList && props.gameList.length !== 0">
        <BaseDrawerItem
            v-for="game in props.gameList"
            :key="game.id"
            icon="robot"
            :content="game.computerName"
            action="delete"
            @click="goToGame(game.id)"
            @delete="deleteThisGame(game.id)"
            :highlighted="game.id == route.params.id"
        />
    </ul>
</template>
