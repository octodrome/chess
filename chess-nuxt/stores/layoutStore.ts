export const useLayoutStore = defineStore('layout', {
    state: () => ({
        drawer: {
            leftIsOpened: false,
            rightIsOpened: false,
        },

        modal: {
            isOpened: false,
            content: '',
        },

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

        openModal(content) {
            this.modal.isOpened = true
            this.modal.content = content
        },

        closeModal() {
            this.modal.isOpened = false
            this.modal.content = ''
        },

        openSnackbar(params) {
            this.snackbar.message = params.message
            this.snackbar.color = params.color
            this.snackbar.isOpened = true
        },

        openSnackbarError(message) {
            ;(this.snackbar.message = message
                ? message
                : 'Une erreur est survenue. Veuillez réessayer ulterieurement.'),
                (this.snackbar.color = 'error')
            this.snackbar.isOpened = true
        },

        openSnackbarSuccess(message) {
            this.snackbar.message = message
            this.snackbar.color = 'success'
            this.snackbar.isOpened = true
        },

        closeSnackbar() {
            this.snackbar.isOpened = false
        },
    },
})
