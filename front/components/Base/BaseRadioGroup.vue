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
    <div class="bg-gray-100 rounded p-3">
        <label class="font-bold" v-if="props.label">{{ props.label }}</label>

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
                @update:model-value="$emit('update:modelValue', $event)"
            />
        </component>
    </div>
</template>
