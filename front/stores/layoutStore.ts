export type IModalContent =
    | 'Login'
    | 'MyAccount'
    | 'NewGameComputer'
    | 'NewGameHuman'
    | 'Signup'
    | 'Chat'
    | 'Settings'
    | ''

export interface IModal {
    isOpened: boolean
    content: IModalContent
}

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        drawer: {
            leftIsOpened: false,
            rightIsOpened: false,
        },

        modal: {
            isOpened: false,
            content: '',
        } as IModal,

        snackbar: {
            isOpened: false,
            message: '',
            color: '',
        },
    }),

    actions: {
        toggleLeftDrawer() {
            this.drawer.leftIsOpened = !this.drawer.leftIsOpened
        },

        toggleRightDrawer() {
            this.drawer.rightIsOpened = !this.drawer.rightIsOpened
        },

        closeRightDrawer() {
            this.drawer.rightIsOpened = false
        },

        openModal(content: IModalContent) {
            this.modal.isOpened = true
            this.modal.content = content
        },

        closeModal() {
            this.modal.isOpened = false
            this.modal.content = ''
        },

        openSnackbarError(message: string) {
            this.snackbar.message = message
            this.snackbar.color = 'error'
            this.snackbar.isOpened = true
        },

        openSnackbarSuccess(message: string) {
            this.snackbar.message = message
            this.snackbar.color = 'success'
            this.snackbar.isOpened = true
        },

        closeSnackbar() {
            this.snackbar.isOpened = false
            this.snackbar.message = ''
            this.snackbar.color = ''
        },
    },
})
