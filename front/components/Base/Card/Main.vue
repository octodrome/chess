<script setup lang="ts">
const props = defineProps<{
    text: string
}>()
</script>

<template>
    <div>
        <div class="mt-5 mb-5">{{ props.text }}</div>
        <slot></slot>
    </div>
</template>
