<script setup lang="ts">
const props = defineProps<{
    modelValue: number
    options: { label: string; value: number }[]
    label?: string
    disabledValue?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const updateInput = (event: Event) => {
    const newValue = Number((event.target as HTMLSelectElement).value)
    emit('update:modelValue', newValue)
}
</script>

<template>
    <div class="flex flex-col relative bg-gray-100 rounded p-3">
        <label v-if="label" class="mb-1 font-bold">{{ label }}</label>

        <select
            :value="modelValue"
            @change="updateInput"
            class="border border-solid border-slate-300 rounded p-[8px]"
        >
            <option v-if="disabledValue" disabled value="">
                {{ disabledValue }}
            </option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>
