<script setup lang="ts">
defineProps<{
    options: { label: string; value: string | number }[]
    name: string
    modelValue: string | number
    vertical?: boolean
    label?: string
}>()
</script>

<template>
    <label v-if="label">{{ label }}</label>

    <br v-if="vertical" />

    <component
        v-for="option in options"
        :key="option.value"
        :is="vertical ? 'div' : 'span'"
        :class="{ 'mr-3': !vertical }"
    >
        <BaseRadio
            :label="option.label"
            :value="option.value"
            :name="name"
            :model-value="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            class="mt-1 mb-1"
        />
    </component>
</template>
