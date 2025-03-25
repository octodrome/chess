import { mount } from '@vue/test-utils'
import BaseCardFooter from './BaseCardFooter.vue'
import { describe, expect, it } from 'vitest'

describe('BaseCardFooter.vue', () => {
    it('renders slot content correctly', () => {
        const wrapper = mount(BaseCardFooter, {
            slots: {
                default: 'Test content',
            },
        })
        expect(wrapper.html()).toContain('Test content')
    })

    it('renders an empty footer if no slot content is provided', () => {
        const wrapper = mount(BaseCardFooter)
        expect(wrapper.text()).toBe('')
    })
})
