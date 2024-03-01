<script setup lang="ts">
defineProps<{
    label: string
    modelValue: string | number
    value: string | number
}>()
defineEmits(['update:modelValue'])
</script>

<template>
    <input
        type="radio"
        :checked="modelValue === value"
        :value="value"
        name="pets"
        v-bind="$attrs"
        @change="$emit('update:modelValue', value)"
    />
    <label v-if="label" class="ml-2">{{ label }}</label>
</template>
