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

const userId = userStore.user?.data.ID
const opponents = await userStore.getAllOpponents(userId)
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
                creatorId: userStore.user.data.ID,
                guestId: selectedOpponentId.value,
                hasToPlayId: userStore.user.data.ID,
                moves: '',
            })
            .then((game) => {
                console.log('hoooolooooo')
                close()
                boardStore.startNewGame('human')
                navigateTo({ path: `/HumanGame/${game.data.ID}` })
            })
            .catch((e) => {
                console.log(e)
                layoutStore.openSnackbarError(
                    'Une erreur est survenue pendant la création de la partie'
                )
            })
    }
}
</script>

<template>
    <BaseCardHeader title="New game VS human" />

    <BaseCardMain text="Choose your opponent among the players list.">
        <BaseRadioGroup
            v-model="selectedOpponentId"
            :options="opponentsOptions"
            name="users"
            label="Players"
            vertical
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close">Cancel</BaseButton>

        <BaseButton type="text" @click="start"> Start </BaseButton>
    </BaseCardFooter>
</template>
