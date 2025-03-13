export const ModalContentTypes = [
    'Login',
    'MyAccount',
    'NewGameComputer',
    'NewGameHuman',
    'Signup',
    'Chat',
    'Settings',
    'Confirm',
    undefined,
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

    const openedModal = computed(() => route.query.modal as ModalContent)
    const onConfirmModal = ref<Function | undefined>(undefined)

    const openModal = async (content: ModalContent, onConfirm?: Function) => {
        router.push({
            name: route.name,
            params: route.params,
            query: { ...route.query, modal: content },
        })
        if (onConfirm) onConfirmModal.value = onConfirm
    }

    const closeModal = () => {
        router.push({
            name: route.name,
            params: route.params,
            query: { ...route.query, modal: undefined },
        })
        onConfirmModal.value = undefined
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

        openedModal,
        onConfirmModal,
        openModal,
        closeModal,

        snackbar,
        openSnackbar,
        closeSnackbar,
    }
})
