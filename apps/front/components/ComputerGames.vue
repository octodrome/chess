<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import { useLayoutStore } from '~/stores/layoutStore'
import type { IComputerGame } from '~/types/computerGame'

const props = defineProps<{
    gameList: IComputerGame[]
}>()

const route = useRoute()
const router = useRouter()
const boardStore = useBoardStore()
const computerGameStore = useComputerGameStore()
const layoutStore = useLayoutStore()

const goToGame = (gameId: string) => {
    if (route.params.id === gameId) return
    boardStore.continueGame('computer')
    router.push({
        path: `/ComputerGame/${gameId}`,
        query: { ld: undefined },
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
    <div
        class="max-h-[160px] overflow-auto scrollbar-hide"
        v-if="props.gameList && props.gameList.length !== 0"
    >
        <BaseDrawerItem
            v-for="game in props.gameList"
            :key="game.id"
            icon="robot"
            :content="game.guest_name"
            action="delete"
            :highlighted="game.id == route.params.id"
            @click="goToGame(game.id)"
            @delete="deleteThisGame(game.id)"
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
