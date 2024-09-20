<script setup lang="ts">
const props = defineProps<{
    options: { label: string; value: string | number }[]
    name: string
    modelValue: string | number
    vertical?: boolean
    label?: string
}>()
defineEmits(['update:modelValue'])
</script>

<template>
    <label v-if="props.label">{{ props.label }}</label>

    <br v-if="props.vertical" />

    <component
        :is="props.vertical ? 'div' : 'span'"
        v-for="option in props.options"
        :key="option.value"
        :class="{ 'mr-3': !props.vertical }"
    >
        <BaseRadio
            :label="option.label"
            :value="option.value"
            :name="props.name"
            :model-value="props.modelValue"
            class="mt-1 mb-1"
            @update:model-value="$emit('update:modelValue', $event)"
        />
    </component>
</template>
