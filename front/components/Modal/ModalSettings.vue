<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLayoutStore } from '@/stores/layoutStore'

const { t } = useI18n()
const layoutStore = useLayoutStore()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const languages = ref([
    {
        label: t('modals.settings.language.en'),
        value: 'en',
    },
    {
        label: t('modals.settings.language.fr'),
        value: 'fr',
    },
])

const language = ref('en')
if (process.client) language.value = localStorage.getItem('locale') || 'en'

const close = () => emit('close')

const confirm = () => {
    if (process.client) localStorage.setItem('locale', language.value)
    location.reload()
}
</script>

<template>
    <BaseCardHeader :title="$t('options.settings')" @close="close" />

    <BaseCardMain text="">
        <BaseRadioGroup
            v-model="language"
            :options="languages"
            name="languages"
            :label="$t('modals.settings.language.label')"
            vertical
        />
    </BaseCardMain>

    <BaseCardFooter>
        <BaseButton type="text" class="mr-2" @click="close">{{
            $t('actions.cancel')
        }}</BaseButton>

        <BaseButton type="text" @click="confirm">{{
            $t('actions.confirm')
        }}</BaseButton>
    </BaseCardFooter>
</template>
