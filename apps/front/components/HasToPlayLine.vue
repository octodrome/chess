<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore'

const boardStore = useBoardStore()

const props = defineProps<{
    side: 'player' | 'opponent'
    isChecked: boolean
    isCheckMated: boolean
}>()

const lineClasses = computed(() => {
    return {
        'has-to-play': true,
        'has-to-play--white': props.side === 'player',
        'has-to-play--black': props.side === 'opponent',
        'has-to-play--checked': props.isChecked,
        'has-to-play--checkmated': props.isCheckMated,
    }
})

const showLine = computed(() => {
    return (
        (boardStore.hasToPlay === boardStore.playerColor &&
            props.side === 'player') ||
        (boardStore.hasToPlay !== boardStore.playerColor &&
            props.side === 'opponent')
    )
})
</script>

<template>
    <div v-if="showLine" :class="lineClasses" />
</template>

<style scoped lang="scss">
.has-to-play {
    position: absolute;
    height: 5px;
    border-radius: 2.5px;
    opacity: 0.6;
    width: 100%;
    background-color: #65d6a7;
    filter: blur(1px);
    z-index: 0;

    &--black {
        top: -5px;
    }

    &--white {
        bottom: -5px;
    }

    &--checked {
        background-color: orange;
    }

    &--checkmated {
        background-color: red;
    }
}
</style>
