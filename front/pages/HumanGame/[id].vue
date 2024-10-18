<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '@/services'

const route = useRoute()
const userStore = useUserStore()
const boardStore = useBoardStore()
const humanGameStore = useHumanGameStore()

// watch(userStore.user, () => joinGame(route.params.id as string))
watch(route, (newValue, oldValue) => {
    leaveGame(oldValue.params.id as string)
    joinGame(newValue.params.id as string)
})

onMounted(() => joinGame(route.params.id as string))

const joinGame = (gameId: string) => {
    humanGameStore.getGame(gameId)
    if (userStore.user) {
        services.socket.joinGame({
            gameId: gameId,
            userId: userStore.user.email,
        })
    }
}

const leaveGame = (gameId: string) => {
    if (userStore.user) {
        services.socket.leaveGame({
            gameId: gameId,
            userId: userStore.user.email,
        })
    }
}
</script>

<template>
    <BoardContainer :board="boardStore.board" />
</template>
