// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useLayoutStore } from './layoutStore'
import { describe, it, expect, beforeEach } from 'vitest'
import { exposeContextToEnv } from '@nuxt/test-utils'

describe('Layout Store', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        setActivePinia(createPinia())
    })

    it('has correct initial state', () => {
        const layoutStore = useLayoutStore()
        expect(layoutStore.drawer.leftIsOpened).toBe(false)
        expect(layoutStore.drawer.rightIsOpened).toBe(false)
        expect(layoutStore.modal.isOpened).toBe(false)
        expect(layoutStore.modal.content).toBe('')
        expect(layoutStore.snackbar.isOpened).toBe(false)
        expect(layoutStore.snackbar.color).toBe('')
        expect(layoutStore.snackbar.message).toBe('')
    })

    describe('actions', () => {
        it('toggleLeftDrawer()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.toggleLeftDrawer()
            expect(layoutStore.drawer.leftIsOpened).toBe(true)
            layoutStore.toggleLeftDrawer()
            expect(layoutStore.drawer.leftIsOpened).toBe(false)
        })

        it('toggleRightDrawer()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.toggleRightDrawer()
            expect(layoutStore.drawer.rightIsOpened).toBe(true)
            layoutStore.toggleRightDrawer()
            expect(layoutStore.drawer.rightIsOpened).toBe(false)
        })

        it('closeRightDrawer()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.drawer.rightIsOpened = true
            layoutStore.closeRightDrawer()
            expect(layoutStore.drawer.rightIsOpened).toBe(false)
        })

        it('openModal()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.openModal('modal content')
            expect(layoutStore.modal.isOpened).toBe(true)
            expect(layoutStore.modal.content).toBe('modal content')
        })

        it('closeModal()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.modal.isOpened = true
            layoutStore.modal.content = 'modal content'
            layoutStore.closeModal()
            expect(layoutStore.modal.isOpened).toBe(false)
            expect(layoutStore.modal.content).toBe('')
        })

        it('openSnackbarError()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.openSnackbarError('error message')
            expect(layoutStore.snackbar.isOpened).toBe(true)
            expect(layoutStore.snackbar.message).toBe('error message')
            expect(layoutStore.snackbar.color).toBe('error')
        })

        it('openSnackbarSuccess()', () => {
            const layoutStore = useLayoutStore()
            layoutStore.openSnackbarSuccess('success message')
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
