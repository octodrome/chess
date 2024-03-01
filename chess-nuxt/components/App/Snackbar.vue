<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'

const layoutStore = useLayoutStore()

const props = defineProps<{
    message: string
    color: string
}>()
</script>

<template>
    <div
        class="bg-red-500 text-white absolute bottom-0 left-1/2 m-5 rounded p-5 z-50"
    >
        <span class="mr-3">{{ props.message }}</span>

        <button @click="layoutStore.closeSnackbar">
            <BaseIcon name="close" />
        </button>
    </div>
</template>
