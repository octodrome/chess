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
    const router = useRouter()
    const route = useRoute()

    const drawerLeftIsOpened = computed(() => route.query.ld === 'o')
    const drawerRightIsOpened = computed(() => route.query.rd === 'o')

    const openLeftDrawer = () =>
        router.push({
            name: route.name,
            params: route.params,
            query: { ...route.query, ld: 'o' },
        })

    const openRightDrawer = () =>
        router.push({
            name: route.name,
            params: route.params,
            query: { ...route.query, rd: 'o' },
        })

    const closeLeftDrawer = () =>
        router.push({
            name: route.name,
            params: route.params,
            query: { ...route.query, ld: undefined },
        })

    const closeRightDrawer = () =>
        router.push({
            name: route.name,
            params: route.params,
            query: { ...route.query, rd: undefined },
        })

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
        drawerLeftIsOpened,
        drawerRightIsOpened,
        openLeftDrawer,
        openRightDrawer,
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
