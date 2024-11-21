<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useLayoutStore } from '~/stores/layoutStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const layoutStore = useLayoutStore()

const pseudo = ref('')
const about = ref('')

const userStore = useUserStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const close = () => emit('close')

const update = () => {
    userStore
        .updateUser(String(userStore.user?.id), {
            pseudo: pseudo.value,
            about: about.value,
        })
        .then(() => {
            close()
        })
        .catch(() => {
            layoutStore.openSnackbarError(t('snackbar.error.game_update'))
        })
}
</script>

<template>
    <BaseCardHeader :title="$t('options.account')" @close="close" />

    <BaseCardMain :text="$t('modals.account.text')">
        <BaseTextField
            :model-value="userStore.user?.email"
            type="text"
            :label="$t('modals.account.email')"
            disabled
            data-cy="form_account_email_field"
        />

        <BaseTextField
            type="text"
            :label="$t('modals.account.pseudo')"
            :model-value="userStore.user?.pseudo"
            @update:model-value="(e: string) => (pseudo = e)"
        />

        <BaseTextField
            :label="$t('modals.account.about')"
            type="text"
            :model-value="userStore.user?.about"
            @update:model-value="(e: string) => (about = e)"
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close()">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="update">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
