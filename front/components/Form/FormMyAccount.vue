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
    <BaseCardHeader :title="$t('options.account')" />

    <BaseCardMain :text="$t('modals.account.text')">
        <BaseTextField
            v-model="userStore.user.data.email"
            type="text"
            :label="$t('modals.account.email')"
            disabled
        />

        <BaseTextField
            v-model="firstName"
            type="text"
            :label="$t('modals.account.first_name')"
        />

        <BaseTextField
            v-model="lastName"
            type="text"
            :label="$t('modals.account.last_name')"
        />

        <BaseTextField
            v-model="age"
            type="text"
            :label="$t('modals.account.age')"
        />

        <BaseTextField
            v-model="bio"
            type="text"
            :label="$t('modals.account.about')"
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="cancel()">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text">{{ $t('actions.confirm') }}</BaseButton>
    </BaseCardFooter>
</template>
