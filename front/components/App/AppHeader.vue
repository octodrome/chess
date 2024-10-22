<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'
const layoutStore = useLayoutStore()
</script>

<template>
    <header class="p-2">
        <BaseButton
            type="icon"
            @click="layoutStore.toggleLeftDrawer"
            data-cy="app_header_left_button"
        >
            <BaseIcon
                v-if="!layoutStore.drawer.leftIsOpened"
                name="menu"
                color="black"
            />
            <BaseIcon v-else name="arrow-left" color="black" />
        </BaseButton>

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
