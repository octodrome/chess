<script setup lang="ts">
import { useComputerGameStore } from '~/stores/computerGameStore'
import { useLayoutStore } from '~/stores/layoutStore'
import type { IColor } from '~/types/computerGame'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const computerGameStore = useComputerGameStore()
const layoutStore = useLayoutStore()

const levels = ref([
    {
        label: t('modals.new_game_computer.level.easy'),
        value: 1,
    },
    {
        label: t('modals.new_game_computer.level.medium'),
        value: 2,
    },
    {
        label: t('modals.new_game_computer.level.hard'),
        value: 3,
    },
])

const color = ref('white' as IColor)

const colors = ref([
    {
        label: t('modals.new_game_computer.color.white'),
        value: 'white',
    },
    {
        label: t('modals.new_game_computer.color.black'),
        value: 'black',
    },
])

const computerLevel = ref(1)

const close = () => emit('close')

const start = () => {
    computerGameStore
        .createGame({
            playerColor: color.value,
            computerLevel: computerLevel.value,
            opponentColor: color.value === 'white' ? 'black' : 'white',
        })
        .then((game) => {
            close()
            navigateTo({
                path: `/ComputerGame/${game.id}`,
                query: { ld: undefined },
            })
        })
}
</script>

<template>
    <BaseCardHeader :title="$t('options.newComputerGame')" @close="close" />

    <BaseCardMain :text="$t('modals.new_game_computer.text')">
        <BaseRadioGroup
            v-model="computerLevel"
            :options="levels"
            name="levels"
            :label="$t('modals.new_game_computer.level.label')"
            vertical
            class="mb-2"
        />

        <BaseRadioGroup
            v-model="color"
            :options="colors"
            name="colors"
            :label="$t('modals.new_game_computer.color.label')"
            vertical
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="start">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
