<script setup lang="ts">
import { useLayoutStore, type IModalContent } from '~/stores/layoutStore'
const layoutStore = useLayoutStore()

const props = defineProps<{ content: IModalContent }>()

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
</script>

<template>
    <div
        class="bg-slate-600/50 absolute top-0 left-0 z-40 w-screen h-screen flex justify-center items-center"
        @click.self="layoutStore.closeModal()"
    >
        <div
            class="bg-white text-slate-800 rounded drop-shadow-2xl p-5 w-[550px]"
        >
            <component
                :is="modals[props.content]"
                @close="layoutStore.closeModal()"
            />
        </div>
    </div>
</template>
