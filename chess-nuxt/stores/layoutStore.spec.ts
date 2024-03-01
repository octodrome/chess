import { describe, expect, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLayoutStore } from './layoutStore'
let layoutStore

describe('layoutStore', async () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        layoutStore = useLayoutStore()
    })

    it('initial state', () => {
        expect(layoutStore.drawer).toStrictEqual({
            leftIsOpened: false,
            rightIsOpened: false,
        })
        expect(layoutStore.modal).toStrictEqual({
            isOpened: false,
            content: '',
        })
        expect(layoutStore.snackbar).toStrictEqual({
            isOpened: false,
            message: '',
            color: '',
        })
    })

    it('toggleLeftDrawer', () => {
        layoutStore.toggleLeftDrawer()
        expect(layoutStore.drawer.leftIsOpened).toBe(true)
        layoutStore.toggleLeftDrawer()
        expect(layoutStore.drawer.leftIsOpened).toBe(false)
    })

    it('toggleRightDrawer', () => {
        layoutStore.toggleRightDrawer()
        expect(layoutStore.drawer.rightIsOpened).toBe(true)
        layoutStore.toggleRightDrawer()
        expect(layoutStore.drawer.rightIsOpened).toBe(false)
    })

    it('closeRightDrawer', () => {
        layoutStore.closeRightDrawer()
        expect(layoutStore.drawer.rightIsOpened).toBe(false)
        layoutStore.toggleRightDrawer()
        expect(layoutStore.drawer.rightIsOpened).toBe(true)
        layoutStore.closeRightDrawer()
        expect(layoutStore.drawer.rightIsOpened).toBe(false)
    })

    it('openModal', () => {
        layoutStore.openModal('modal-name')
        expect(layoutStore.modal.content).toBe('modal-name')
        expect(layoutStore.modal.isOpened).toBe(true)
    })

    it('closeModal', () => {
        layoutStore.closeModal()
        expect(layoutStore.modal.isOpened).toBe(false)
        layoutStore.openModal('modal-name')
        expect(layoutStore.modal.isOpened).toBe(true)
        layoutStore.closeModal()
        expect(layoutStore.modal.isOpened).toBe(false)
        expect(layoutStore.modal.content).toBe('')
    })

    it('openSnackbar', () => {
        layoutStore.openSnackbar({ message: 'message', color: 'red' })
        expect(layoutStore.snackbar).toStrictEqual({
            message: 'message',
            color: 'red',
            isOpened: true,
        })
    })

    it('openSnackbarError', () => {
        layoutStore.openSnackbarError('message')
        expect(layoutStore.snackbar).toStrictEqual({
            message: 'message',
            color: 'error',
            isOpened: true,
        })
        layoutStore.closeSnackbar()
        layoutStore.openSnackbarError()
        expect(layoutStore.snackbar).toStrictEqual({
            message:
                'Une erreur est survenue. Veuillez réessayer ulterieurement.',
            color: 'error',
            isOpened: true,
        })
    })

    it('openSnackbarSuccess', () => {
        layoutStore.openSnackbarSuccess('message')
        expect(layoutStore.snackbar).toStrictEqual({
            message: 'message',
            color: 'success',
            isOpened: true,
        })
    })

    it('closeSnackbar', () => {
        layoutStore.openSnackbar('message')
        expect(layoutStore.snackbar.isOpened).toBe(true)
        layoutStore.closeSnackbar('message')
        expect(layoutStore.snackbar.isOpened).toBe(false)
    })
})
