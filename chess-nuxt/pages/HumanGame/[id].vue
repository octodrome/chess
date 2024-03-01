<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import services from '@/services'

const route = useRoute()
const userStore = useUserStore()
const boardStore = useBoardStore()
const humanGameStore = useHumanGameStore()

watch(userStore.user, () => joinGame(route.params.id))
watch(route, (newValue, oldValue) => {
    leaveGame(oldValue.params.id)
    joinGame(newValue.params.id)
})

onMounted(() => joinGame(route.params.id))

const joinGame = (gameId) => {
    console.log('joining human game:', gameId)
    humanGameStore.getGame(gameId)
    if (userStore.user) {
        services.socket.joinGame({
            gameId: gameId,
            userId: userStore.user.email,
        })
    }
}

const leaveGame = (gameId) => {
    console.log('leaving human game:', gameId)
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
