<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import { useLayoutStore } from '~~/stores/layoutStore'

const userStore = useUserStore()
const computerGameStore = useComputerGameStore()
const layoutStore = useLayoutStore()
</script>

<template>
    <BaseDrawer>
        <ul>
            <NuxtLink to="/">
                <BaseDrawerItem icon="chess-knight" content="Vue chess" />
            </NuxtLink>

            <BaseDrawerSeparator />

            <BaseDrawerItem
                v-if="!userStore.loggedIn"
                @click="layoutStore.openModal('Signup')"
                icon="login"
                :content="$t('options.signup')"
            />

            <BaseDrawerItem
                v-if="!userStore.loggedIn"
                @click="layoutStore.openModal('Login')"
                icon="account"
                :content="$t('options.login')"
            />

            <BaseDrawerItem
                v-if="userStore.loggedIn"
                @click="userStore.logout"
                icon="logout"
                :content="$t('options.logout')"
            />

            <BaseDrawerItem
                v-if="userStore.loggedIn"
                @click="layoutStore.openModal('MyAccount')"
                icon="card-account-details"
                content="My Account"
            />

            <BaseDrawerSeparator />

            <BaseDrawerItem
                @click="layoutStore.openModal('NewGameComputer')"
                icon="plus"
                :content="$t('options.newComputerGame')"
            />

            <ComputerGames
                v-if="computerGameStore.gameList.length"
                :gameList="computerGameStore.gameList"
            />

            <BaseDrawerSeparator />

            <BaseDrawerItem
                :disabled="!userStore.loggedIn"
                @click="
                    !userStore.loggedIn || layoutStore.openModal('NewGameHuman')
                "
                icon="plus"
                :content="$t('options.newHumanGame')"
            />

            <HumanGames v-if="userStore.loggedIn" />

            <BaseDrawerSeparator />

            <BaseDrawerItem icon="cog" :content="$t('options.settings')" />
        </ul>
    </BaseDrawer>
</template>
