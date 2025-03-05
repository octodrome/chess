<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'
import { useLayoutStore } from '~/stores/layoutStore'

const route = useRoute()

const humanGameStore = useHumanGameStore()
const userStore = useUserStore()
const boardStore = useBoardStore()
const layoutStore = useLayoutStore()

const goToGame = (gameId: string) => {
    if (route.params.id === gameId) return

    humanGameStore.getGame(gameId)
    boardStore.continueGame('human')
    navigateTo({
        path: `/HumanGame/${gameId}`,
    })
    layoutStore.closeLeftDrawer()
}

const deleteThisGame = (gameId: string) => {
    layoutStore.openModal('Confirm', () => {
        humanGameStore.deleteGame(gameId)
        if (route.params.id === gameId) navigateTo({ path: '/' })
    })
}
</script>

<template>
    <div
        class="max-h-[160px] overflow-auto scrollbar-hide"
        v-if="humanGameStore.gameList?.length !== 0"
    >
        <BaseDrawerItem
            v-for="game in humanGameStore.gameList"
            :key="game.id"
            icon="account"
            :content="
                game.creator.email === userStore.user?.email
                    ? game.guest.pseudo || game.guest.email
                    : game.creator.pseudo || game.creator.email
            "
            action="delete"
            :highlighted="String(game.id) == route.params.id"
            @click="goToGame(String(game.id))"
            @delete="deleteThisGame(String(game.id))"
        />
    </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
