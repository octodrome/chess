// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            },
        ],
        '@nuxtjs/tailwindcss',
        '@nuxtjs/eslint-module',
    ],
    css: ['@mdi/font/css/materialdesignicons.min.css', '@/assets/css/main.css'],
    devtools: { enabled: true },
})
