<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'

const route = useRoute()

const humanGameStore = useHumanGameStore()
const userStore = useUserStore()
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
            :content="
                game.creator.email === userStore.user?.email
                    ? game.guest.email
                    : game.creator.email
            "
            action="delete"
            @click="goToGame(String(game.ID))"
            @delete="deleteThisGame(String(game.ID))"
        />
    </ul>
</template>
