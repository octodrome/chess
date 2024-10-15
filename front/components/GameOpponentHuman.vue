<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'

const humanGameStore = useHumanGameStore()
const layoutStore = useLayoutStore()
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

        <button @click="layoutStore.openModal('Chat')">open chat</button>
    </div>
</template>
