<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useHumanGameStore } from '~/stores/humanGameStore'

const route = useRoute()

const humanGameStore = useHumanGameStore()
const boardStore = useBoardStore()

const goToGame = (gameId: string) => {
    if (route.params.id === gameId) return

    humanGameStore.getGame(gameId)
    boardStore.continueGame('human')
    navigateTo({
        path: `/HumanGame/${gameId}`,
    })
}

const deleteThisGame = (gameId: string) => {
    humanGameStore.deleteGame(gameId)
    if (route.params.id === gameId) navigateTo({ path: '/' })
}
</script>

<template>
    <ul v-if="humanGameStore.gameList?.length !== 0">
        <BaseDrawerItem
            v-for="game in humanGameStore.gameList"
            :key="game.ID"
            icon="account"
            :content="game.guest.email"
            action="delete"
            @click="goToGame(game.ID)"
            @delete="deleteThisGame(game.ID)"
        />
    </ul>
</template>
