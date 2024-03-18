<script setup lang="ts">
import { useHumanGameStore } from '~/stores/humanGameStore'
import { useUserStore } from '~/stores/userStore'
import moment from 'moment'
import services from '~/services'
import type { ApiMessage } from '~/server/models/game.model'

const route = useRoute()
const humanGameStore = useHumanGameStore()
const userStore = useUserStore()

const messageContent = ref('')

const isMessageEmpty = computed(() => messageContent.value.trim().length === 0)
const createdAt = computed(() =>
    humanGameStore.opponent
        ? moment(humanGameStore.opponent.createdAt).fromNow()
        : ''
)
const isUserMessage = computed(
    () => (message: ApiMessage) =>
        humanGameStore.opponent
            ? message.from !== humanGameStore.opponent.email
            : false
)
const messages = computed(() =>
    humanGameStore.currentGame ? humanGameStore.currentGame.messages : []
)

const sendMessage = () => {
    if (userStore.user && !isMessageEmpty) {
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
        <h2 class="headline">{{ humanGameStore.opponent.email }}</h2>

        <div class="d-flex flex-column">
            <div class="mt-0 mb-10">Registered {{ createdAt }}</div>

            <div
                v-for="message in messages"
                :key="message._id"
                class="message"
                :class="{
                    'is-right': isUserMessage(message),
                    'is-left': !isUserMessage(message),
                    'align-self-end': isUserMessage(message),
                }"
            >
                {{ message.content }}
            </div>
        </div>

        <div>
            <input
                v-model="messageContent"
                label="Your message"
                outlined
                dense
                hide-details="auto"
                class="mr-2"
                @keyup.enter="sendMessage()"
            />

            <button
                color="blue-grey darken-3"
                :disabled="isMessageEmpty"
                @click="sendMessage()"
            >
                <BaseIcon name="send" />
            </button>
        </div>
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
    border-radius: 8px 8px 0 8px;
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
