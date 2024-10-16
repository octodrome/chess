import { createI18n } from 'vue-i18n'
import en from '~/locales/en'
import fr from '~/locales/fr'

function resolveEN(lang: string) {
    return lang === 'en-US' ? 'en' : lang
}

function getLang() {
    if (process.client) {
        if (localStorage.getItem('locale')) {
            return localStorage.getItem('locale') || 'en'
        }
        if (navigator.languages != undefined) {
            return navigator.languages[0]
        }
        else return navigator.language
    } else {
        return 'en'
    }
}

export default defineNuxtPlugin(({ vueApp }) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: resolveEN(getLang()),
        messages: {
            en,
            fr,
        },
    })

    vueApp.use(i18n)
})
