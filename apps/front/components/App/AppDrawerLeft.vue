<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useComputerGameStore } from '~/stores/computerGameStore'
import { useLayoutStore } from '~~/stores/layoutStore'

const userStore = useUserStore()
const computerGameStore = useComputerGameStore()
const layoutStore = useLayoutStore()
const router = useRouter()

const goToHome = () => {
    router.push({ path: '/', query: { ld: undefined } })
}
</script>

<template>
    <BaseDrawer>
        <div>
            <div class="flex justify-between items-center">
                <div @click="goToHome" class="flex-1">
                    <BaseDrawerItem icon="chess-knight" content="Nuxt Chess" />
                </div>

                <BaseButton
                    type="icon"
                    class="sm:absolute -right-14 top-1 z-50 text-white sm:text-black mr-1"
                    @click="layoutStore.closeLeftDrawer()"
                    aria-label="Close app menu"
                >
                    <BaseIcon
                        v-if="!layoutStore.drawerLeftIsOpened"
                        name="menu"
                    />
                    <BaseIcon v-else name="arrow-left" />
                </BaseButton>
            </div>

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
        </div>
    </BaseDrawer>
</template>
