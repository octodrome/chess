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
    console.log("userStore.user", userStore.user)
    console.log("game", game)

    if (userStore.user) {
        return game.GuestID === userStore.user.data.ID
            ? game.UserID
            : game.GuestID
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
            :key="game.ID"
            icon="account"
            :content="opponentEmail(game)"
            action="delete"
            @click="goToGame(game.ID)"
            @delete="deleteThisGame(game.ID)"
        />
    </ul>
</template>
