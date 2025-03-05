<script setup lang="ts">
const props = defineProps<{
    title?: string
}>()
</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">{{ props.title }}</h2>
        <BaseButton type="icon" @click="$emit('close')">
            <BaseIcon name="close" color="black"></BaseIcon>
        </BaseButton>
    </div>
</template>
