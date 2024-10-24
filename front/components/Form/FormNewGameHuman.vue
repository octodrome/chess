<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useBoardStore } from '~/stores/boardStore'
import { useLayoutStore } from '~/stores/layoutStore'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const userStore = useUserStore()
const humanGameStore = useHumanGameStore()
const boardStore = useBoardStore()
const layoutStore = useLayoutStore()

const userId = userStore.user?.ID
const opponents = await userStore.getAllOpponents(String(userId))
const selectedOpponentId = ref(opponents[0].ID)

const opponentsOptions = computed(() => {
    return opponents.map((user) => {
        return {
            label: user.email,
            value: user.ID,
        }
    })
})

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
                layoutStore.openSnackbarError(
                    'Une erreur est survenue pendant la création de la partie'
                )
            })
    }
}
</script>

<template>
    <BaseCardHeader :title="$t('options.newHumanGame')" />

    <BaseCardMain :text="$t('modals.new_game_human.text')">
        <BaseRadioGroup
            v-model="selectedOpponentId"
            :options="opponentsOptions"
            name="users"
            :label="$t('modals.new_game_human.players')"
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
