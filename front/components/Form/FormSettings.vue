<script setup lang="ts">
const emit = defineEmits<{
    (e: 'close'): void
}>()

const displaySchemes = ref([
    {
        label: 'Dark mode',
        value: 'dark_mode',
    },
    {
        label: 'Light mode',
        value: 'light_mode',
    },
])
const displayScheme = ref(
    localStorage.getItem('display_scheme') || 'light_mode'
)

const languages = ref([
    {
        label: 'English',
        value: 'en',
    },
    {
        label: 'French',
        value: 'fr',
    },
])

const language = ref(localStorage.getItem('locale') || 'en')

const cancel = () => emit('close')

const confirm = () => {
    localStorage.setItem('locale', language.value)
    localStorage.setItem('display_scheme', displayScheme.value)

    location.reload()
}
</script>

<template>
    <BaseCardHeader :title="$t('options.settings')" />

    <BaseCardMain :text="$t('modals.settings.text')">
        <BaseRadioGroup
            v-model="displayScheme"
            :options="displaySchemes"
            name="displaySchemes"
            :label="$t('modals.settings.display_scheme.label')"
            vertical
        />

        <br />

        <BaseRadioGroup
            v-model="language"
            :options="languages"
            name="languages"
            :label="$t('modals.settings.language.label')"
            vertical
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="cancel">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="confirm">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
