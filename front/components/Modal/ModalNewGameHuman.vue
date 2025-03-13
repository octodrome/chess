<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useHumanGameStore } from '~/stores/humanGameStore'
import type { IColor } from '~/types/computerGame'
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
const route = useRoute()
const router = useRouter()

const userId = userStore.user?.id
const opponents = await userStore.getAllOpponents(String(userId))
const selectedOpponentId = ref(opponents[0]?.id)

const opponentsOptions = computed(() => {
    return opponents.map((user) => {
        return {
            label: user.pseudo || user.email,
            value: user.id,
        }
    })
})

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

const userIsNotAlone = computed(() => opponents.length >= 1)

const close = () => emit('close')

const goToGame = (gameId: string) => {
    if (route.params.id === gameId) return
    boardStore.continueGame('human')
    router.push({
        path: `/HumanGame/${gameId}`,
        query: { ld: undefined },
    })
}

const start = () => {
    if (userStore.user && selectedOpponentId) {
        humanGameStore
            .createGame({
                creator_id: userStore.user.id,
                guest_id: selectedOpponentId.value,
                has_to_play_id: userStore.user.id,
                creator_color: color.value,
                guest_color: color.value === 'white' ? 'black' : 'white',
                moves: '',
                fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            })
            .then((game) => {
                close()
                boardStore.startNewGame('human')
                goToGame(String(game.id))
            })
            .catch(() => {
                layoutStore.openSnackbar(
                    t('snackbar.error.game_creation'),
                    'error'
                )
            })
    }
}
</script>

<template>
    <BaseCardHeader :title="$t('options.newHumanGame')" @close="close" />

    <BaseCardMain
        v-if="userIsNotAlone"
        :text="$t('modals.new_game_human.text')"
    >
        <BaseSelect
            v-model="selectedOpponentId"
            :options="opponentsOptions"
            :label="$t('modals.new_game_human.players')"
            class="mb-2"
        />

        <BaseRadioGroup
            v-model="color"
            :options="colors"
            name="colors"
            :label="$t('modals.new_game_human.color.label')"
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
