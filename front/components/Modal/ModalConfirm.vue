<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'

const layoutStore = useLayoutStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const close = () => emit('close')

const confirm = () => {
    if (layoutStore.modal.onConfirm) layoutStore.modal.onConfirm()
    close()
}
</script>

<template>
    <BaseCardHeader @close="close" />

    <BaseCardMain :text="$t('modals.confirm.text')"></BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="confirm">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
