import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config: StorybookConfig = {
    stories: ['../components/**/*.stories.@(js|ts)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    async viteFinal(config, { configType }) {
        // Merge custom Vite configuration with Storybook's
        return mergeConfig(config, {
            plugins: [vue()], // Add the Vue plugin for handling .vue files
        })
    },
}

export default config
