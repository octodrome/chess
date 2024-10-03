// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    experimental: {
        // fix pieces images not showing on prod
        appManifest: false,
    },
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
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    typescript: {
        strict: true,
    },
    runtimeConfig: {
        mongoDbUri: process.env.MONGODB_URI,
        jwtSecret: process.env.JWT_SECRET,
        public: {
            restApiUrl: process.env.REST_API_URL,
        },
    },
    serverHandlers: [
        {
            route: '/ws',
            handler: '~/server/middleware/socket',
        },
    ],
})
