<script setup lang="ts">
const props = defineProps<{
    label?: string
    modelValue: boolean
}>()
defineEmits(['update:modelValue'])
</script>

<template>
    <input
        type="checkbox"
        :checked="props.modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label v-if="props.label">{{ props.label }}</label>
</template>
