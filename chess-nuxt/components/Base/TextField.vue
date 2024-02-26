<script setup lang="ts">
defineProps<{
  type?: string;
  modelValue?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const uniqueName = ref(Date.now().toString());

const updateInput = (event) => emit("update:modelValue", event.target.value);
</script>

<template>
  <div class="mt-2 mb-2 flex flex-col h-16 relative">
    <label v-if="label" :for="uniqueName" class="mb-1">{{ label }} :</label>

    <input
      :id="uniqueName"
      :type="type"
      class="border border-solid border-slate-300 rounded pl-1"
      :class="{ 'border-red-500': error }"
      :value="modelValue"
      @input="updateInput"
      :required="required"
      :disabled="disabled"
    />
    <div v-if="error" class="text-red-500 text-xs absolute -bottom-2 left-0">
      {{ error }}
    </div>
  </div>
</template>