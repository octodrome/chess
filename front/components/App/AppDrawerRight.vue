<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'
const layoutStore = useLayoutStore()
</script>

<template>
    <BaseDrawer>
        <div>
            <div class="flex justify-between items-center">
                <GameOpponent class="flex-1" />

                <BaseButton
                    v-if="$route.path !== '/'"
                    type="icon"
                    class="sm:absolute -left-14 top-1 text-white sm:text-black mr-1"
                    @click="layoutStore.closeRightDrawer()"
                >
                    <BaseIcon name="arrow-right" aria-label="Close game menu" />
                </BaseButton>
            </div>

            <BaseDrawerSeparator />

            <GameInfos />
        </div>

        <GameMoves />
    </BaseDrawer>
</template>
