<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'
import moment from 'moment'
import type { ApiMessage } from '~/types/humanGame'
import { WebSocketClient } from '~/plugins/websocket.client'

const { $webSocketClient } = useNuxtApp()
const socketClient = $webSocketClient as WebSocketClient

const route = useRoute()
const humanGameStore = useHumanGameStore()
const userStore = useUserStore()

const messageContent = ref('')

const isMessageEmpty = computed(() => messageContent.value.trim().length === 0)
const isUserMessage = computed(
    () => (message: ApiMessage) =>
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

const chatContainer = useTemplateRef('chatContainer')

const scrollToBottom = () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.$el.scrollTop =
                chatContainer.value.$el.scrollHeight
        }
    })
}

watch(messages, () => {
    scrollToBottom()
})

onMounted(() => {
    humanGameStore.getGame(route.params.id as string)
    nextTick(() => scrollToBottom())
})
</script>

<template>
    <BaseCardHeader
        :title="`${$t('modals.chat.title_start')} ${
            humanGameStore.opponent?.pseudo ||
            humanGameStore.opponent?.email ||
            ''
        }
        `"
        @close="$emit('close')"
    />

    <BaseCardMain
        :text="humanGameStore.opponent?.about || ''"
        class="overflow-y-scroll flex flex-col"
        ref="chatContainer"
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
    </BaseCardMain>

    <BaseCardFooter>
        <input
            v-model="messageContent"
            outlined
            dense
            hide-details="auto"
            class="mr-3 border border-gray-200 rounded-full p-[8px] px-[20px] flex-1"
            @keyup.enter="sendMessage()"
            aria-label="Type your message"
        />

        <button
            color="blue-grey darken-3"
            :disabled="isMessageEmpty"
            class="border border-gray-800 rounded-full bg-gray-800 w-[48px] h-[48px] text-white disabled:bg-gray-500 disabled:border-gray-500"
            @click="sendMessage()"
            aria-label="Send message"
        >
            <BaseIcon name="send" />
        </button>
    </BaseCardFooter>
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
    background-color: #3a5766;
    color: white;
    border-radius: 8px 0 8px 8px;
    align-self: flex-end;
    .time {
        color: #ffffff;
    }
}
.is-left {
    background-color: #d5d5d5;
    border-radius: 0 8px 8px 8px;
    .time {
        color: #ffffff;
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
    font-size: 10px;
    font-weight: bold;
}
</style>
