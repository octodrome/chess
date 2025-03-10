<script setup lang="ts">
import { useLayoutStore, type ModalContent } from '~/stores/layoutStore'
const layoutStore = useLayoutStore()

const props = defineProps<{ content: ModalContent }>()

const modals = {
    Login: resolveComponent('ModalLogin'),
    MyAccount: resolveComponent('ModalMyAccount'),
    NewGameComputer: resolveComponent('ModalNewGameComputer'),
    NewGameHuman: resolveComponent('ModalNewGameHuman'),
    Signup: resolveComponent('ModalSignup'),
    Chat: resolveComponent('ModalChat'),
    Settings: resolveComponent('ModalSettings'),
    Confirm: resolveComponent('ModalConfirm'),
    '': '',
}

onMounted(() => {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            layoutStore.closeModal()
        }
    })
})
</script>

<template>
    <div
        class="bg-slate-600/50 absolute top-0 left-0 z-40 w-screen h-svh flex justify-center items-center"
        @click.self="layoutStore.closeModal()"
    >
        <div
            class="bg-white text-slate-800 sm:rounded drop-shadow-2xl p-5 w-full sm:w-[550px] h-svh sm:h-auto sm:max-h-[600px] flex flex-col justify-between overflow-y-auto"
        >
            <component
                :is="modals[props.content]"
                @close="layoutStore.closeModal()"
            />
        </div>
    </div>
</template>
