<script setup lang="ts">
const props = defineProps<{
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
            'cursor-pointer': !props.disabled,
            'hover:bg-gray-600': !props.disabled,
            'text-gray-400': props.disabled,
        }"
    >
        <div class="flex">
            <BaseIcon v-if="props.icon" :name="props.icon" class="mr-2" />

            <h3>{{ props.content }}</h3>
        </div>

        <div class="invisible group-hover/item:visible">
            <BaseIcon
                v-if="props.action === 'delete'"
                name="delete"
                @click.stop="$emit('delete')"
                class="hover:text-gray-400"
            />

            <BaseIcon
                v-if="props.action === 'message'"
                name="message"
                @click.stop="$emit('message')"
                class="hover:text-gray-400"
            />
        </div>
    </div>
</template>
