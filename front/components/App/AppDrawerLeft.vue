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
                <BaseDrawerItem icon="chess-knight" content="Chess" />
            </NuxtLink>

            <BaseDrawerSeparator />

            <BaseDrawerItem
                v-if="!userStore.loggedIn"
                icon="login"
                :content="$t('options.signup')"
                data-cy="app_drawer_left_signup_button"
                @click="layoutStore.openModal('Signup')"
            />

            <BaseDrawerItem
                v-if="!userStore.loggedIn"
                icon="account"
                :content="$t('options.login')"
                @click="layoutStore.openModal('Login')"
            />

            <BaseDrawerItem
                v-if="userStore.loggedIn"
                icon="logout"
                :content="$t('options.logout')"
                @click="userStore.logout"
            />

            <BaseDrawerItem
                v-if="userStore.loggedIn"
                icon="card-account-details"
                :content="$t('options.account')"
                data-cy="app_drawer_left_account_button"
                @click="layoutStore.openModal('MyAccount')"
            />

            <BaseDrawerSeparator />

            <BaseDrawerItem
                icon="plus"
                :content="$t('options.newComputerGame')"
                @click="layoutStore.openModal('NewGameComputer')"
            />

            <ComputerGames
                v-if="computerGameStore.gameList.length"
                :game-list="computerGameStore.gameList"
            />

            <BaseDrawerSeparator />

            <BaseDrawerItem
                :disabled="!userStore.loggedIn"
                icon="plus"
                :content="$t('options.newHumanGame')"
                @click="
                    !userStore.loggedIn || layoutStore.openModal('NewGameHuman')
                "
            />

            <HumanGames v-if="userStore.loggedIn" />

            <BaseDrawerSeparator />

            <BaseDrawerItem
                icon="cog"
                :content="$t('options.settings')"
                @click="layoutStore.openModal('Settings')"
            />
        </ul>
    </BaseDrawer>
</template>
