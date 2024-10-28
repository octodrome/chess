<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'
import { useLayoutStore } from '~/stores/layoutStore'

const layoutStore = useLayoutStore()

const pseudo = ref('')
const about = ref('')

const userStore = useUserStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const cancel = () => emit('close')

const update = () => {
    userStore
        .updateUser(String(userStore.user?.ID), {
            pseudo: pseudo.value,
            about: about.value,
        })
        .then(() => {
            cancel()
        })
        .catch(() => {
            layoutStore.openSnackbarError(
                "Une erreur est survenue pendant la modification des donnees de l'utilisateur"
            )
        })
}
</script>

<template>
    <BaseCardHeader :title="$t('options.account')" />

    <BaseCardMain :text="$t('modals.account.text')">
        <BaseTextField
            :model-value="userStore.user?.email"
            type="text"
            :label="$t('modals.account.email')"
            disabled
            data-cy="form_account_email_field"
        />

        <BaseTextField
            :model-value="userStore.user?.pseudo"
            @update:model-value="(e) => (pseudo = e)"
            type="text"
            :label="$t('modals.account.pseudo')"
        />

        <BaseTextField
            :model-value="userStore.user?.about"
            @update:model-value="(e) => (about = e)"
            type="text"
            :label="$t('modals.account.about')"
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="cancel()">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="update">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
