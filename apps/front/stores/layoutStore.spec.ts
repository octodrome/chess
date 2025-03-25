import { setActivePinia, createPinia } from 'pinia'
import { useLayoutStore } from './layoutStore'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('Layout Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('has correct initial state', () => {
        const layoutStore = useLayoutStore()
        expect(layoutStore.drawerLeftIsOpened).toBe(false)
        expect(layoutStore.drawerRightIsOpened).toBe(false)
        expect(layoutStore.openedModal).toBe(undefined)
        expect(layoutStore.snackbar.isOpened).toBe(false)
        expect(layoutStore.snackbar.color).toBe('')
        expect(layoutStore.snackbar.message).toBe('')
    })

    describe('actions', () => {
        // it('openLeftDrawer()', () => {
        //     const layoutStore = useLayoutStore()
        //     layoutStore.openLeftDrawer()
        //     expect(layoutStore.drawerLeftIsOpened).toBe(true)
        // })

        // it('openRightDrawer()', () => {
        //     const layoutStore = useLayoutStore()
        //     layoutStore.openRightDrawer()
        //     expect(layoutStore.drawerRightIsOpened).toBe(true)
        // })

        it('closeRightDrawer()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.closeRightDrawer()
            expect(layoutStore.drawerRightIsOpened).toBe(false)
        })

        // it('openModal()', () => {
        //     const layoutStore = useLayoutStore()
        //     layoutStore.openModal('Settings')
        //     expect(layoutStore.openedModal).toBe('Settings')
        // })

        it('closeModal()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.closeModal()
            expect(layoutStore.openedModal).toBe(undefined)
        })

        it('openSnackbar() with error', () => {
            const layoutStore = useLayoutStore()
            layoutStore.openSnackbar('error message', 'error')
            expect(layoutStore.snackbar.isOpened).toBe(true)
            expect(layoutStore.snackbar.message).toBe('error message')
            expect(layoutStore.snackbar.color).toBe('error')
        })

        it('openSnackbar() with success', () => {
            const layoutStore = useLayoutStore()
            layoutStore.openSnackbar('success message', 'success')
            expect(layoutStore.snackbar.isOpened).toBe(true)
            expect(layoutStore.snackbar.message).toBe('success message')
            expect(layoutStore.snackbar.color).toBe('success')
        })

        it('closeSnackbar()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.snackbar.isOpened = true
            layoutStore.snackbar.color = 'success'
            layoutStore.snackbar.message = 'success message'
            layoutStore.closeSnackbar()
            expect(layoutStore.snackbar.isOpened).toBe(false)
            expect(layoutStore.snackbar.color).toBe('')
            expect(layoutStore.snackbar.message).toBe('')
        })
    })
})
