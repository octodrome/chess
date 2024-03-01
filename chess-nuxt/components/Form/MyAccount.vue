<script setup lang="ts">
import { useUserStore } from '~/stores/userStore'

const firstName = ref('')
const lastName = ref('')
const age = ref('')
const bio = ref('')

const userStore = useUserStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const cancel = () => emit('close')
</script>

<template>
    <BaseCardHeader title="My account" />

    <BaseCardMain
        text="Add some information about you. This will be visible when other players choose to play with you."
    >
        <BaseTextField
            v-model="userStore.user.email"
            type="text"
            label="Email"
            disabled
        />

        <BaseTextField v-model="firstName" type="text" label="First name" />

        <BaseTextField v-model="lastName" type="text" label="Last name" />

        <BaseTextField v-model="age" type="text" label="Age" />

        <BaseTextField v-model="bio" type="text" label="About me" />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="cancel()"
            >Cancel</BaseButton
        >

        <BaseButton type="text">Confirm</BaseButton>
    </BaseCardFooter>
</template>
