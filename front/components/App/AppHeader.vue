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
            type="icon"
            data-cy="app_header_left_button"
            @click="layoutStore.toggleLeftDrawer"
        >
            <BaseIcon
                v-if="!layoutStore.drawer.leftIsOpened"
                name="menu"
                color="black"
            />
            <BaseIcon v-else name="arrow-left" color="black" />
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
            v-if="$route.path !== '/'"
            type="icon"
            @click="layoutStore.toggleRightDrawer"
        >
            <BaseIcon
                v-if="!layoutStore.drawer.rightIsOpened"
                name="dots-vertical"
                color="black"
            />
            <BaseIcon v-else name="arrow-right" color="black" />
        </BaseButton>
    </header>
</template>
