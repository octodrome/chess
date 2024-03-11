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
        '@nuxt/test-utils/module',
    ],
    css: ['@mdi/font/css/materialdesignicons.min.css', '@/assets/css/main.css'],
    devtools: { enabled: true },
    typescript: {
        strict: true,
    },
    runtimeConfig: {
        mongoDbUri: process.env.MONGODB_URI,
        jwtSecret: process.env.JWT_SECRET,
    },
})
