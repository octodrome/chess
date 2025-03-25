<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
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
    const signupUserParams = {
        email: values.email,
        password: values.password,
    }

    userStore
        .signup(signupUserParams)
        .then(() => userStore.login(signupUserParams))
        .then(() => close())
        .catch(() =>
            layoutStore.openSnackbar(
                t('snackbar.error.email_password'),
                'error'
            )
        )
})

const goToLogin = () => {
    close()
    layoutStore.openModal('Login')
}
</script>

<template>
    <BaseCardHeader :title="$t('options.signup')" @close="close" />

    <BaseCardMain>
        <div class="mt-5 mb-5">
            {{ $t('modals.signup.text_start') }}
            <span
                @click="goToLogin"
                class="underline cursor-pointer font-bold"
                >{{ $t('modals.signup.link') }}</span
            >
            {{ $t('modals.signup.text_end') }}
        </div>

        <BaseTextField
            type="email"
            :model-value="email"
            :label="$t('modals.signup.email')"
            required
            :error="errors.email"
            data-cy="form_signup_email_field"
            @change="handleEmailChange"
            class="mb-2"
        />

        <BaseTextField
            type="password"
            :model-value="password"
            :label="$t('modals.signup.password')"
            required
            :error="errors.password"
            data-cy="form_signup_password_field"
            @change="handlePasswordChange"
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close">
            {{ $t('actions.cancel') }}
        </BaseButton>

        <BaseButton
            type="text"
            data-cy="form_signup_confirm_button"
            @click="submit"
        >
            {{ $t('actions.confirm') }}
        </BaseButton>
    </BaseCardFooter>
</template>
