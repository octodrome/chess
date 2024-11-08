<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'
import moment from 'moment'
import type { IMessage } from '~/types/humanGame'
import { WebSocketClient } from '~/plugins/websocket.client'

const { $webSocketClient } = useNuxtApp()
const socketClient = $webSocketClient as WebSocketClient

const route = useRoute()
const humanGameStore = useHumanGameStore()
const userStore = useUserStore()

const messageContent = ref('')

const isMessageEmpty = computed(() => messageContent.value.trim().length === 0)
const isUserMessage = computed(
    () => (message: IMessage) =>
        humanGameStore.opponent
            ? message.from_id !== humanGameStore.opponent.id
            : false
)
const messages = computed(() =>
    humanGameStore.currentGame ? humanGameStore.currentGame.messages : []
)

const userToken = useCookie('token')

const sendMessage = () => {
    if (
        userStore.user &&
        !isMessageEmpty.value &&
        userToken.value &&
        humanGameStore.currentGame &&
        humanGameStore.opponent
    ) {
        socketClient.sendMessage({
            token: userToken.value,
            game_id: humanGameStore.currentGame.id,
            to_id: humanGameStore.opponent.id,
            from_id: userStore.user.id,
            content: messageContent.value,
        })
        messageContent.value = ''
    }
}

const chatContainer = ref(null)

const scrollToBottom = () => {
    if (chatContainer.value) {
        ;(chatContainer.value as HTMLElement).scrollTop = (
            chatContainer.value as HTMLElement
        ).scrollHeight
    }
}

watch(messages, () => {
    nextTick(() => scrollToBottom())
})

onMounted(() => {
    humanGameStore.getGame(route.params.id as string)
    scrollToBottom()
})
</script>

<template>
    <div>
        <BaseCardHeader
            :title="
                humanGameStore.opponent?.pseudo ||
                humanGameStore.opponent?.email ||
                ''
            "
        />

        <BaseCardMain :text="humanGameStore.opponent?.about || ''">
            <div
                ref="chatContainer"
                class="flex flex-col max-h-80 overflow-y-scroll"
            >
                <div
                    v-for="message in messages"
                    :key="message.id"
                    class="message"
                    :class="{
                        'is-right': isUserMessage(message),
                        'is-left': !isUserMessage(message),
                    }"
                >
                    {{ message.content }}
                    <div class="time">
                        {{ moment(message.created_at).format('hh:mm') }}
                    </div>
                </div>
            </div>
        </BaseCardMain>

        <BaseCardFooter class="mt-3">
            <input
                v-model="messageContent"
                label="Your message"
                outlined
                dense
                hide-details="auto"
                class="mr-2 border border-gray-200 rounded-full px-3 w-full"
                @keyup.enter="sendMessage()"
            />

            <button
                color="blue-grey darken-3"
                :disabled="isMessageEmpty"
                class="border border-gray-200 rounded-full bg-gray-800 w-7"
                @click="sendMessage()"
            >
                <BaseIcon name="send" />
            </button>
        </BaseCardFooter>
    </div>
</template>

<style lang="scss" scoped>
.message {
    width: 70%;
    margin-top: 1px;
    padding: 2px 35px 10px 6px;
    position: relative;
}
.is-right {
    text-align: right;
    background-color: #607d8b;
    color: white;
    border-radius: 8px 0 8px 8px;
    align-self: flex-end;
    .time {
        color: #d5d5d5;
    }
}
.is-left {
    background-color: #d5d5d5;
    border-radius: 0 8px 8px 8px;
    .time {
        color: #607d8b;
    }
}
/* Add a space between groups of same user messages */
.is-right + .is-left,
.is-left + .is-right {
    margin-top: 4px;
}
.time {
    position: absolute;
    right: 5px;
    bottom: 2px;
    font-size: 9px;
}
</style>
