<script setup lang="ts">
defineProps<{
    label?: string
    modelValue: boolean
}>()
defineEmits(['update:modelValue'])
</script>

<template>
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label v-if="label">{{ label }}</label>
</template>
