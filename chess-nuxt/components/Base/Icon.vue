<script setup lang="ts">
const props = defineProps<{
    name: string
    color?: 'black' | 'white'
}>()

const iconColor = computed(() => {
    if (props.color === 'black') return 'text-black'
    else return 'text-white'
})
</script>

<template>
    <span :class="`mdi mdi-${name} ${iconColor}`"></span>
</template>
