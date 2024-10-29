<script setup lang="ts">
const props = defineProps<{
    label: string
    modelValue: string | number
    value: string | number
}>()
defineEmits(['update:modelValue'])
</script>

<template>
    <label>
        <input
            type="radio"
            :checked="props.modelValue === props.value"
            :value="props.value"
            name="pets"
            v-bind="$attrs"
            @change="$emit('update:modelValue', props.value)"
        />
        <span v-if="props.label" class="ml-2">{{ props.label }}</span>
    </label>
</template>
