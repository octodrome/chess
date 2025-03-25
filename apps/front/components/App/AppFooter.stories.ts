import type { Meta, StoryObj } from '@storybook/vue3'

import AppFooter from './AppFooter.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction

const meta = {
    title: 'App/AppFooter',
    component: AppFooter,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
    tags: ['autodocs'],
} satisfies Meta<typeof AppFooter>

export default meta
type Story = StoryObj<typeof meta>

export const AppFooterStory: Story = {
    args: {},
}
