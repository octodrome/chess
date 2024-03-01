<script setup lang="ts">
import { useComputerGameStore } from '~/stores/computerGameStore'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const computerGameStore = useComputerGameStore()

const levels = ref([
    {
        label: 'Easy',
        value: 1,
    },
    {
        label: 'Medium',
        value: 2,
    },
    {
        label: 'Hard',
        value: 3,
    },
])

const color = ref('white')

const colors = ref([
    {
        label: 'White',
        value: 'white',
    },
    {
        label: 'Black',
        value: 'black',
    },
])

const computerLevel = ref(1)

const cancel = () => emit('close')

const start = () => {
    computerGameStore
        .createGame({
            playerColor: color.value,
            computerLevel: computerLevel.value,
        })
        .then((game) => {
            emit('close')

            navigateTo({
                path: `/ComputerGame/${game.id}`,
            })
        })
}
</script>

<template>
    <BaseCardHeader title="New game VS computer" />

    <BaseCardMain
        text="Set your new game choosing the level and which color you will play with."
    >
        <BaseRadioGroup
            v-model="computerLevel"
            :options="levels"
            name="levels"
            label="Choose your level :"
            vertical
        />

        <br />

        <BaseRadioGroup
            v-model="color"
            :options="colors"
            name="colors"
            label="Choose your color :"
            vertical
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="cancel">Cancel</BaseButton>

        <BaseButton type="text" @click="start">Start</BaseButton>
    </BaseCardFooter>
</template>
