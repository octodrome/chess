<script setup lang="ts">
import type { ApiGame } from '~/server/models/game.model'
import { useBoardStore } from '~/stores/boardStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'

const route = useRoute()

const humanGameStore = useHumanGameStore()
const userStore = useUserStore()
const boardStore = useBoardStore()

const opponentEmail = (game: ApiGame) => {
    if (userStore.user) {
        return game.guest.email === userStore.user.email
            ? game.creator.email
            : game.guest.email
    }
}

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
            :key="game._id"
            icon="account"
            :content="opponentEmail(game)"
            action="delete"
            @click="goToGame(game._id)"
            @delete="deleteThisGame(game._id)"
        />
    </ul>
</template>
