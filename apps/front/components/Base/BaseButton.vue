<script setup lang="ts">
const props = defineProps<{
    type: 'text' | 'icon'
    disabled?: boolean
    ariaLabel?: string
}>()
</script>

<template>
    <div>
        <button
            v-if="props.type === 'icon'"
            :disabled="props.disabled"
            class="hover:bg-gray-500 transition duration-300 w-12 h-12 rounded-full"
            :aria-label="ariaLabel"
        >
            <slot />
        </button>

        <button
            v-if="props.type === 'text'"
            :disabled="props.disabled"
            class="bg-gray-800 text-white hover:bg-gray-500 transition duration-300 p-2 rounded h-[48px]"
        >
            <slot />
        </button>
    </div>
</template>
