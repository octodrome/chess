<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'
import { useBoardStore } from '~/stores/boardStore'
import { useHumanGameStore } from '~/stores/humanGameStore'

const layoutStore = useLayoutStore()
const boardStore = useBoardStore()
const humanGameStore = useHumanGameStore()
const computerGameStore = useComputerGameStore()
const isAgainstHuman = computed(() => boardStore.opponent === 'human')
const route = useRoute()
</script>

<template>
    <header class="p-2">
        <BaseButton
            v-if="!layoutStore.drawerLeftIsOpened"
            type="icon"
            @click="layoutStore.openLeftDrawer()"
            aria-label="Open app menu"
        >
            <BaseIcon
                name="menu"
                color="black"
                data-cy="app_header_open_left"
            />
        </BaseButton>

        <div class="text-gray-600 mt-2" v-if="route.path != '/'">
            <div v-if="isAgainstHuman && humanGameStore.currentGame">
                {{
                    humanGameStore.opponent?.pseudo ||
                    humanGameStore.pseudoFromEmail
                }}
            </div>
            <div v-if="!isAgainstHuman && computerGameStore.currentGame">
                <BaseIcon
                    :name="boardStore.playerHasToPlay ? 'robot' : 'robot-angry'"
                />
                {{ computerGameStore.currentGame?.guest_name }} ★{{
                    computerGameStore.currentGame.guest_level
                }}
            </div>
        </div>

        <BaseButton
            v-if="$route.path !== '/' && !layoutStore.drawerRightIsOpened"
            type="icon"
            @click="layoutStore.openRightDrawer()"
            aria-label="Open game menu"
        >
            <BaseIcon name="dots-vertical" color="black" />
        </BaseButton>
    </header>
</template>
