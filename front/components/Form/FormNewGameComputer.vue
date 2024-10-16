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
    <BaseCardHeader :title="$t('options.newComputerGame')" />

    <BaseCardMain :text="$t('modals.new_game_computer.text')">
        <BaseRadioGroup
            v-model="computerLevel"
            :options="levels"
            name="levels"
            :label="$t('modals.new_game_computer.level.label')"
            vertical
        />

        <br />

        <BaseRadioGroup
            v-model="color"
            :options="colors"
            name="colors"
            :label="$t('modals.new_game_computer.color.label')"
            vertical
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="cancel">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="start">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
