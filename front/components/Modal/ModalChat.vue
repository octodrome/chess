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
            ? message.from_id !== humanGameStore.opponent.ID
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
        services.socket.sendMessage({
            token: userToken.value,
            game_id: humanGameStore.currentGame.ID,
            to_id: humanGameStore.opponent.ID,
            from_id: userStore.user.ID,
            content: messageContent.value,
        })
        messageContent.value = ''
    }
}

onMounted(() => humanGameStore.getGame(route.params.id as string))
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
            <div class="flex flex-col">
                <div
                    v-for="message in messages"
                    :key="message.ID"
                    class="message"
                    :class="{
                        'is-right': isUserMessage(message),
                        'is-left': !isUserMessage(message),
                    }"
                >
                    {{ message.content }}
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
    align-self: flex-end;
}
.is-left {
    background-color: #d5d5d5;
    border-radius: 0 8px 8px 8px;
}
/* Add a space between groups of same user messages */
.is-right + .is-left,
.is-left + .is-right {
    margin-top: 4px;
}
</style>
