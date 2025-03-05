<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'
const layoutStore = useLayoutStore()
</script>

<template>
    <BaseDrawer>
        <div>
            <div class="flex justify-between items-center">
                <GameOpponent />

                <BaseButton
                    v-if="$route.path !== '/'"
                    type="icon"
                    class="sm:absolute -left-14 top-1 text-white sm:text-black mr-1"
                    @click="layoutStore.toggleRightDrawer"
                >
                    <BaseIcon
                        v-if="!layoutStore.drawer.rightIsOpened"
                        name="dots-vertical"
                        aria-label="Open game menu"
                    />
                    <BaseIcon
                        v-else
                        name="arrow-right"
                        aria-label="Close game menu"
                    />
                </BaseButton>
            </div>

            <BaseDrawerSeparator />

            <GameInfos />
        </div>

        <GameMoves />
    </BaseDrawer>
</template>
