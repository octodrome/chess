<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import { WebSocketClient } from '~/plugins/websocket.client'

const { $webSocketClient } = useNuxtApp()
const socketClient = $webSocketClient as WebSocketClient
const route = useRoute()
const boardStore = useBoardStore()
const humanGameStore = useHumanGameStore()
const userToken = useCookie('token')
async function parseToken(token: string) {
    return await JSON.parse(atob(token.split('.')[1]))
}

watch(route, (newValue, oldValue) => {
    leaveGame(oldValue.params.id as string)
    joinGame(newValue.params.id as string)
})

onMounted(() => joinGame(route.params.id as string))

const joinGame = async (gameId: string) => {
    humanGameStore.getGame(gameId)
    if (userToken.value) {
        socketClient.joinGame({
            gameId: Number(gameId),
            userId: (await parseToken(userToken.value)).id,
        })
    }
}

const leaveGame = async (gameId: string) => {
    if (userToken.value) {
        socketClient.leaveGame({
            gameId: Number(gameId),
            userId: (await parseToken(userToken.value)).id,
        })
    }
}
</script>

<template>
    <BoardContainer :board="boardStore.board" />
</template>
