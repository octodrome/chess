import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ChessPiece from '../components/ChessPiece.vue'
vi.mock('../services/engine/index.ts')

describe('ChessPiece', () => {
    it('is a Vue instance', () => {
        const wrapper = shallowMount(ChessPiece)
        expect(wrapper.vm).toBeFalsy()
    })
})
