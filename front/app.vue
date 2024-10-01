<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'
import { useComputerGameStore } from './stores/computerGameStore'
import { useUserStore } from './stores/userStore'
import { useHumanGameStore } from './stores/humanGameStore'

useHead({
    title: 'Chess',
})

const layoutStore = useLayoutStore()
const userStore = useUserStore()
const humanGameStore = useHumanGameStore()
const computerGameStore = useComputerGameStore()
async function parseToken(token: string) {
    return await JSON.parse(atob(token.split('.')[1]))
}
const userToken = useCookie('token')

onMounted(async () => {
    if (userToken.value) {
        console.log('token', userToken.value)
        const userId = (await parseToken(userToken.value)).id
        console.log('userId', userId)
        await userStore.getUser(userId)
        await humanGameStore.getUserGames()
    }

    computerGameStore.getGames()
})
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
