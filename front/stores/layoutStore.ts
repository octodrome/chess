export const ModalContentTypes = [
    'Login',
    'MyAccount',
    'NewGameComputer',
    'NewGameHuman',
    'Signup',
    'Chat',
    'Settings',
    'Confirm',
    '',
] as const

export type ModalContent = (typeof ModalContentTypes)[number]

export interface IModal {
    isOpened: boolean
    content: ModalContent
    onConfirm?: Function
}

export const useLayoutStore = defineStore('layout', () => {
    const drawer = ref({
        leftIsOpened: false,
        rightIsOpened: false,
    })

    const toggleLeftDrawer = () => {
        drawer.value.leftIsOpened = !drawer.value.leftIsOpened
    }

    const toggleRightDrawer = () => {
        drawer.value.rightIsOpened = !drawer.value.rightIsOpened
    }

    const closeLeftDrawer = () => {
        drawer.value.leftIsOpened = false
    }

    const closeRightDrawer = () => {
        drawer.value.rightIsOpened = false
    }

    const modal = ref<IModal>({
        isOpened: false,
        content: '',
        onConfirm: undefined,
    })

    const openModal = (content: ModalContent, onConfirm?: Function) => {
        modal.value.isOpened = true
        modal.value.content = content
        modal.value.onConfirm = onConfirm
    }

    const closeModal = () => {
        modal.value.isOpened = false
        modal.value.content = ''
        modal.value.onConfirm = undefined
    }

    const snackbar = ref({
        isOpened: false,
        message: '',
        color: '',
    })

    const openSnackbar = (message: string, color: 'success' | 'error') => {
        snackbar.value.message = message
        snackbar.value.color = color
        snackbar.value.isOpened = true
    }

    const closeSnackbar = () => {
        snackbar.value.isOpened = false
        snackbar.value.message = ''
        snackbar.value.color = ''
    }

    return {
        drawer,
        toggleLeftDrawer,
        toggleRightDrawer,
        closeLeftDrawer,
        closeRightDrawer,

        modal,
        openModal,
        closeModal,

        snackbar,
        openSnackbar,
        closeSnackbar,
    }
})
