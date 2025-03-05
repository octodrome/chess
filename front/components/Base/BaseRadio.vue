<script setup lang="ts">
const props = defineProps<{
    label: string
    modelValue: string | number
    value: string | number
}>()
defineEmits(['update:modelValue'])
</script>

<template>
    <label class="flex items-center">
        <input
            type="radio"
            :checked="props.modelValue === props.value"
            :value="props.value"
            name="pets"
            v-bind="$attrs"
            @change="$emit('update:modelValue', props.value)"
            class="mt-[4px] mb-[4px] h-[35.75px]"
        />
        <span v-if="props.label" class="ml-2">{{ props.label }}</span>
    </label>
</template>
