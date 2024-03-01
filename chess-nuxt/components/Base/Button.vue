<script setup lang="ts">
defineProps<{
    type: 'text' | 'icon'
    disabled?: boolean
}>()
</script>

<template>
    <div>
        <button
            v-if="type === 'icon'"
            :disabled="disabled"
            class="hover:bg-gray-300 transition duration-300 w-12 h-12 rounded-full"
        >
            <slot />
        </button>

        <button
            v-if="type === 'text'"
            :disabled="disabled"
            class="hover:bg-gray-300 transition duration-300 p-2 rounded"
        >
            <slot />
        </button>
    </div>
</template>
