<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'
import moment from 'moment'
import services from '~/services'
import type { IMessage } from '~/types/humanGame'

const route = useRoute()
const humanGameStore = useHumanGameStore()
const userStore = useUserStore()

const messageContent = ref('')

const isMessageEmpty = computed(() => messageContent.value.trim().length === 0)
const createdAt = computed(() =>
    humanGameStore.opponent
        ? moment(humanGameStore.opponent.CreatedAt).fromNow()
        : ''
)
const isUserMessage = computed(
    () => (message: IMessage) =>
        humanGameStore.opponent
            ? message.from !== humanGameStore.opponent.email
            : false
)
const messages = computed(() =>
    humanGameStore.currentGame ? humanGameStore.currentGame.messages : []
)

const sendMessage = () => {
    if (userStore.user) {
        services.socket.sendMessage({
            from: userStore.user.email,
            content: messageContent.value,
        })
        messageContent.value = ''
    }
}

onMounted(() => humanGameStore.getGame(route.params.id as string))
</script>

<template>
    <div>
        <BaseCardHeader :title="humanGameStore.opponent?.email || ''" />

        <BaseCardMain :text="`Registered ${createdAt}`">
            <div
                v-for="message in messages"
                :key="message.ID"
                class="message"
                :class="{
                    'is-right': isUserMessage(message),
                    'is-left': !isUserMessage(message),
                    'align-self-end': isUserMessage(message),
                }"
            >
                {{ message.content }}
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
                @click="sendMessage()"
                class="border border-gray-200 rounded-full bg-gray-800 w-7"
            >
                <BaseIcon name="send" />
            </button>
        </BaseCardFooter>
    </div>
</template>

<style scoped>
.message {
    width: 70%;
    margin-top: 1px;
    padding: 2px 6px 2px 6px;
}
.is-right {
    text-align: right;
    background-color: #607d8b;
    color: white;
    border-radius: 8px 0 8px 8px;
}
.is-left {
    background-color: #d5d5d5;
    border-radius: 8px 8px 8px 0;
}
/* Add a space between groups of same user messages */
.is-right + .is-left,
.is-left + .is-right {
    margin-top: 4px;
}
</style>
