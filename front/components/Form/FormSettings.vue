<script setup lang="ts">
import { useComputerGameStore } from '~/stores/computerGameStore'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const computerGameStore = useComputerGameStore()

const colorSchemes = ref([
    {
        label: 'Dark mode',
        value: 'dark_mode',
    },
    {
        label: 'Light mode',
        value: 'light_mode',
    },
])

const colorScheme = ref('dark_mode')

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

const confirm = () => {}

watch(language, () => localStorage.setItem('locale', language.value))
</script>

<template>
    <BaseCardHeader :title="$t('options.settings')" />

    <BaseCardMain
        :text="$t('modals.settings.text')"
    >
        <BaseRadioGroup
            v-model="colorScheme"
            :options="colorSchemes"
            name="colorSchemes"
            :label="$t('modals.settings.color_scheme.label')"
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
        <BaseButton type="text" class="mr-2" @click="cancel">{{ $t('actions.cancel') }}</BaseButton>

        <BaseButton type="text" @click="confirm">{{ $t('actions.confirm') }}</BaseButton>
    </BaseCardFooter>
</template>
