<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import { useLayoutStore } from '~/stores/layoutStore'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const { t } = useI18n()
const userStore = useUserStore()
const humanGameStore = useHumanGameStore()
const boardStore = useBoardStore()
const layoutStore = useLayoutStore()

const userId = userStore.user?.ID
const opponents = await userStore.getAllOpponents(String(userId))
const selectedOpponentId = ref(opponents[0]?.ID)

const opponentsOptions = computed(() => {
    return opponents.map((user) => {
        return {
            label: user.pseudo || user.email,
            value: user.ID,
        }
    })
})

const userIsNotAlone = computed(() => opponents.length >= 1)

const close = () => emit('close')

const start = () => {
    if (userStore.user && selectedOpponentId) {
        humanGameStore
            .createGame({
                creator_id: userStore.user.ID,
                guest_id: selectedOpponentId.value,
                has_to_play_id: userStore.user.ID,
                moves: '',
            })
            .then((game) => {
                close()
                boardStore.startNewGame('human')
                navigateTo({ path: `/HumanGame/${game.ID}` })
            })
            .catch(() => {
                layoutStore.openSnackbarError(t('snackbar.error.game_creation'))
            })
    }
}
</script>

<template>
    <BaseCardHeader :title="$t('options.newHumanGame')" />

    <BaseCardMain
        v-if="userIsNotAlone"
        :text="$t('modals.new_game_human.text')"
    >
        <BaseRadioGroup
            v-model="selectedOpponentId"
            :options="opponentsOptions"
            name="users"
            :label="$t('modals.new_game_human.players')"
            vertical
        />
    </BaseCardMain>

    <BaseCardMain
        v-else
        :text="`${$t('modals.new_game_human.default')}: http://165.22.119.201`"
    ></BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton v-if="userIsNotAlone" type="text" @click="start">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
