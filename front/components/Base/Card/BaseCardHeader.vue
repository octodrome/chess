<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
</script>

<template>
    <h2 class="text-2xl">{{ props.title }}</h2>
</template>
