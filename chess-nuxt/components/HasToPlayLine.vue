<script setup lang="ts">
import { useBoardStore } from "~/stores/boardStore";

const boardStore = useBoardStore();

const props = defineProps<{
  color: string;
  isChecked: boolean;
  isCheckMated: boolean;
}>();

const lineClasses = computed(() => {
  return {
    "has-to-play": true,
    "has-to-play--white": props.color === "white",
    "has-to-play--black": props.color === "black",
    "has-to-play--checked": props.isChecked,
    "has-to-play--checkmated": props.isCheckMated,
  };
});
</script>

<template>
  <div v-if="boardStore.hasToPlay === color" :class="lineClasses" />
</template>

<style scoped lang="scss">
.has-to-play {
  position: absolute;
  height: 5px;
  border-radius: 2.5px;
  opacity: 0.6;
  width: 100%;
  background-color: #65d6a7;
  filter: blur(1px);
  z-index: 0;

  &--black {
    top: -5px;
  }

  &--white {
    bottom: -5px;
  }

  &--checked {
    background-color: orange;
  }

  &--checkmated {
    background-color: red;
  }
}
</style>
