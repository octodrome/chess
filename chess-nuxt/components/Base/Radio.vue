<script setup lang="ts">
defineProps<{
    label: string
    modelValue: string | number
    value: string | number
}>()
</script>

<template>
    <input
        type="radio"
        :checked="modelValue === value"
        :value="value"
        name="pets"
        @change="$emit('udpate:modelValue', value)"
        v-bind="$attrs"
    />
    <label v-if="label" class="ml-2">{{ label }}</label>
</template>
