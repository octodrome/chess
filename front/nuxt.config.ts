// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Nuxt Chess',
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            htmlAttrs: {
                lang: 'en',
            },
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
            restApiUrl: process.env.NUXT_PUBLIC_REST_API_URL,
            socketServerUrl: process.env.NUXT_PUBLIC_SOCKET_SERVER_URL,
            allowedHosts: '*', // Allow all hosts for e2e testing
        },
    },

    devServer: {
        host: '0.0.0.0', // Ensure it listens on all interfaces for e2e testing
        port: 3000,
    },

    compatibilityDate: '2025-03-20',
})
