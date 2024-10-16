<script setup lang="ts">
import { useLayoutStore } from '~/stores/layoutStore'
const layoutStore = useLayoutStore()

const props = defineProps<{
    content: string
}>()

const modals = {
    Login: resolveComponent('FormLogin'),
    MyAccount: resolveComponent('FormMyAccount'),
    NewGameComputer: resolveComponent('FormNewGameComputer'),
    NewGameHuman: resolveComponent('FormNewGameHuman'),
    Signup: resolveComponent('FormSignup'),
    Chat: resolveComponent('ChessChat'),
    Settings: resolveComponent('FormSettings'),
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
