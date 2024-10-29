<script setup lang="ts">
const emit = defineEmits<{
    (e: 'close'): void
}>()

const cancel = () => emit('close')

const confirm = () => {}
</script>

<template>
    <BaseCardMain :text="$t('modals.confirm.text')"></BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="cancel">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="confirm">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
