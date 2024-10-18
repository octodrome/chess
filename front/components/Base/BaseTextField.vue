<script setup lang="ts">
const props = defineProps<{
    type?: string
    modelValue?: string
    label?: string
    required?: boolean
    disabled?: boolean
    error?: string
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const uniqueName = ref(Date.now().toString())

const updateInput = (event: Event) =>
    emit('update:modelValue', (event.target as HTMLInputElement).value)
</script>

<template>
    <div class="mt-2 mb-2 flex flex-col h-16 relative">
        <label v-if="props.label" :for="uniqueName" class="mb-1"
            >{{ props.label }} :</label
        >

        <input
            :id="uniqueName"
            :type="props.type"
            class="border border-solid border-slate-300 rounded pl-1"
            :class="{ 'border-red-500': props.error }"
            :value="props.modelValue"
            :required="props.required"
            :disabled="props.disabled"
            @input="updateInput"
        />
        <div
            v-if="props.error"
            class="text-red-500 text-xs absolute -bottom-2 left-0"
        >
            {{ props.error }}
        </div>
    </div>
</template>
