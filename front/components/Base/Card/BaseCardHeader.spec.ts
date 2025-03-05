import { mount } from '@vue/test-utils'
import BaseCardHeader from './BaseCardHeader.vue'
import BaseButton from '../BaseButton.vue'
import { describe, it, expect } from 'vitest'

describe('BaseCardHeader.vue', () => {
    it('renders the title when provided', () => {
        const title = 'Test Title'
        const wrapper = mount(BaseCardHeader, {
            props: {
                title,
            },
        })
        expect(wrapper.text()).toContain(title)
    })

    it('emits close event when close button is clicked', async () => {
        const wrapper = mount(BaseCardHeader)
        const button = wrapper.findComponent(BaseButton)
        await button.trigger('click')

        expect(wrapper.emitted().close).toBeTruthy()
    })
})
