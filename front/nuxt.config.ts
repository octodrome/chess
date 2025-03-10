// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
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
        '@nuxtjs/storybook',
        '@nuxt/image',
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
        public: {
            restApiUrl: process.env.REST_API_URL,
            socketServerUrl: process.env.SOCKET_SERVER_URL,
        },
    },
})
