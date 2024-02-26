<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

const firstName = ref("");
const lastName = ref("");
const age = ref("");
const bio = ref("");

const userStore = useUserStore();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const cancel = () => emit("close");
</script>

<template>
  <BaseCardHeader title="My account" />

  <BaseCardMain
    text="Add some information about you. This will be visible when other players choose to play with you."
  >
    <BaseTextField
      type="text"
      v-model="userStore.user.email"
      label="Email"
      disabled
    />

    <BaseTextField type="text" v-model="firstName" label="First name" />

    <BaseTextField type="text" v-model="lastName" label="Last name" />

    <BaseTextField type="text" v-model="age" label="Age" />

    <BaseTextField type="text" v-model="bio" label="About me" />
  </BaseCardMain>

  <BaseCardFooter>
    <BaseButton type="text" @click="cancel()" class="mr-2">Cancel</BaseButton>

    <BaseButton type="text">Confirm</BaseButton>
  </BaseCardFooter>
</template>
