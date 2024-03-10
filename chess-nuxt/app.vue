<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'
import { useComputerGameStore } from './stores/computerGameStore'
import { useUserStore } from './stores/userStore'
import { useHumanGameStore } from './stores/humanGameStore'

useHead({
    title: 'Vue chess',
})

const layoutStore = useLayoutStore()
const userStore = useUserStore()
const humanGameStore = useHumanGameStore()
const computerGameStore = useComputerGameStore()

onMounted(() => {
    const LocalStorage = process.client ? localStorage : null

    function parseToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]))
    }
    const userToken = LocalStorage.getItem('token')

    if (userToken) {
        const userId = parseToken(userToken).userId
        userStore.getUser(userId)
        humanGameStore.getUserGames(userId)
    }

    computerGameStore.getGames()
})

// Try requests here
// const { data } = await useFetch('/api/game/bla', { method: 'put' })
</script>

<template>
    <div class="bg-gray-200 h-screen flex justify-between">
        <AppDrawerLeft v-if="layoutStore.drawer.leftIsOpened" />

        <div class="basis-full flex flex-col justify-between">
            <AppHeader class="flex justify-between" />

            <main class="flex justify-center items-center">
                <NuxtPage />
            </main>

            <AppFooter class="flex justify-between" />
        </div>

        <AppDrawerRight v-if="layoutStore.drawer.rightIsOpened" />

        <AppSnackbar
            v-if="layoutStore.snackbar.isOpened"
            :message="layoutStore.snackbar.message"
            :color="layoutStore.snackbar.color"
        />

        <AppModal
            v-if="layoutStore.modal.isOpened"
            :content="layoutStore.modal.content"
        />
    </div>
</template>
