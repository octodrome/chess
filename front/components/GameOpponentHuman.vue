<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'

const humanGameStore = useHumanGameStore()
const isOpponentDialogOpened = ref(false)
</script>

<template>
    <div>
        <BaseDrawerItem
            icon="account-circle"
            :content="humanGameStore.opponentPseudo"
            action="message"
            @message="isOpponentDialogOpened = true"
        />

        <div v-if="isOpponentDialogOpened" max-width="500">
            <ChessChat @close="isOpponentDialogOpened = false" />
        </div>
    </div>
</template>
