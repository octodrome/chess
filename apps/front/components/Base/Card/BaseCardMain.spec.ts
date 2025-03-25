import { mount } from '@vue/test-utils'
import BaseCardMain from './BaseCardMain.vue'
import { describe, expect, it } from 'vitest'

describe('BaseCardMain.vue', () => {
    it('renders slot content correctly', () => {
        const wrapper = mount(BaseCardMain, {
            slots: {
                default: 'Test content',
            },
        })
        expect(wrapper.html()).toContain('Test content')
    })

    it('renders the title when provided', () => {
        const text = 'Test Text'
        const wrapper = mount(BaseCardMain, {
            props: {
                text,
            },
        })
        expect(wrapper.text()).toContain(text)
    })
})
