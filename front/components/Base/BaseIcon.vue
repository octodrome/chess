<script setup lang="ts">
const props = defineProps<{
    name: string
}>()
</script>

<template>
    <span :class="`mdi mdi-${props.name}`"></span>
</template>
