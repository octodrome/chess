<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import { useUserStore } from '~/stores/userStore'
import { useLayoutStore } from '~/stores/layoutStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const userStore = useUserStore()
const layoutStore = useLayoutStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const close = () => emit('close')

const validationSchema = object({
    email: string().required().email(),
    password: string().required().min(4),
})

const { handleSubmit, errors } = useForm({
    validationSchema,
})

const { value: email, handleChange: handleEmailChange } =
    useField<string>('email')
const { value: password, handleChange: handlePasswordChange } =
    useField<string>('password')

const submit = handleSubmit((values) => {
    userStore
        .login({ email: values.email, password: values.password })
        .then(() => close())
        .catch(() =>
            layoutStore.openSnackbar(
                t('snackbar.error.email_password'),
                'error'
            )
        )
})

const goToSignup = () => {
    close()
    layoutStore.openModal('Signup')
}
</script>

<template>
    <BaseCardHeader :title="$t('options.login')" @close="close" />

    <BaseCardMain>
        <div class="mt-5 mb-5">
            {{ $t('modals.login.text_start') }}
            <span
                @click="goToSignup"
                class="underline cursor-pointer font-bold"
                >{{ $t('modals.login.link') }}</span
            >
            {{ $t('modals.login.text_end') }}
        </div>

        <form>
            <BaseTextField
                type="email"
                :model-value="email"
                :label="$t('modals.login.email')"
                required
                :error="errors.email"
                @change="handleEmailChange"
                class="mb-2"
            />

            <BaseTextField
                type="password"
                :model-value="password"
                :label="$t('modals.login.password')"
                required
                :error="errors.password"
                @change="handlePasswordChange"
            />
        </form>
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close()">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="submit">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
