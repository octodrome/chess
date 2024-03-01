<script setup lang="ts">
defineProps<{
    disabled?: boolean
    icon?: string
    content: string
    action?: 'delete' | 'message'
}>()
defineEmits(['delete', 'message'])
</script>

<template>
    <div
        class="group/item flex justify-between p-4 transition duration-300 select-none"
        :class="{
            'cursor-pointer': !disabled,
            'hover:bg-gray-600': !disabled,
            'text-gray-400': disabled,
        }"
    >
        <div class="flex">
            <BaseIcon v-if="icon" :name="icon" class="mr-2" />

            <h3>{{ content }}</h3>
        </div>

        <div class="invisible group-hover/item:visible">
            <BaseIcon
                v-if="action === 'delete'"
                name="delete"
                @click.stop="$emit('delete')"
            />

            <BaseIcon
                v-if="action === 'message'"
                name="message"
                @click.stop="$emit('message')"
            />
        </div>
    </div>
</template>
