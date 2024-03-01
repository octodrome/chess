<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { useUserStore } from '~/stores/userStore'
import { useLayoutStore } from '~/stores/layoutStore'

const userStore = useUserStore()
const layoutStore = useLayoutStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const close = () => emit('close')

const validationSchema = object({
    email: string().required().email(),
    password: string().required().min(4),
    newsletterPermission: boolean(),
})

const { handleSubmit, errors } = useForm({
    validationSchema,
})

const { value: email, handleChange: handleEmailChange } =
    useField<string>('email')
const { value: password, handleChange: handlePasswordChange } =
    useField<string>('password')
const { value: newsletterPermission } = useField<boolean>(
    'newsletterPermission'
)

const submit = handleSubmit((values) => {
    const signupUserParams = {
        email: values.email,
        password: values.password,
    }

    console.log('values', values)

    userStore
        .signup(signupUserParams)
        .then(() => userStore.login(signupUserParams))
        .then(() => close())
        .catch(() =>
            layoutStore.openSnackbarError(
                'Adresse email ou mot de passe incorrect'
            )
        )
})
</script>

<template>
    <BaseCardHeader title="Sign up" />

    <BaseCardMain
        text="Create your Vue chess account to play with anybody around the world. You already have an account ? Click here to log in."
    >
        <BaseTextField
            type="email"
            :model-value="email"
            @change="handleEmailChange"
            label="Email"
            required
            :error="errors.email"
        />

        <BaseTextField
            type="password"
            :model-value="password"
            @change="handlePasswordChange"
            label="Password"
            required
            :error="errors.password"
        />

        <BaseCheckbox
            label="Receive newsletter from Vue Chess"
            v-model="newsletterPermission"
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" @click="close" class="mr-2">
            Cancel
        </BaseButton>

        <BaseButton type="text" @click="submit"> Confirm </BaseButton>
    </BaseCardFooter>
</template>
