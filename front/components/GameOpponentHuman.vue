<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'

const humanGameStore = useHumanGameStore()
const layoutStore = useLayoutStore()
</script>

<template>
    <div>
        <BaseDrawerItem
            icon="account-circle"
            :content="humanGameStore.opponentPseudo"
            action="message"
            @message="layoutStore.openModal('Chat')"
        />
    </div>
</template>
