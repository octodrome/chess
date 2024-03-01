<script setup lang="ts">
defineProps<{
    options: { label: string; value: string | number }[]
    name: string
    modelValue: string | number
    vertical?: boolean
    label?: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
    <label v-if="label">{{ label }}</label>

    <br v-if="vertical" />

    <component
        :is="vertical ? 'div' : 'span'"
        v-for="option in options"
        :key="option.value"
        :class="{ 'mr-3': !vertical }"
    >
        <BaseRadio
            :label="option.label"
            :value="option.value"
            :name="name"
            :model-value="modelValue"
            class="mt-1 mb-1"
            @update:model-value="$emit('update:modelValue', $event)"
        />
    </component>
</template>
