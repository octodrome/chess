<script setup lang="ts">
import { useLayoutStore } from "~/stores/layoutStore";
const layoutStore = useLayoutStore();
</script>

<template>
  <header class="p-2">
    <BaseButton @click="layoutStore.toggleLeftDrawer" type="icon">
      <BaseIcon
        v-if="!layoutStore.drawer.leftIsOpened"
        name="menu"
        color="black"
      />
      <BaseIcon v-else name="arrow-left" color="black" />
    </BaseButton>

    <BaseButton
      v-if="$route.path !== '/'"
      @click="layoutStore.toggleRightDrawer"
      type="icon"
    >
      <BaseIcon
        v-if="!layoutStore.drawer.rightIsOpened"
        name="dots-vertical"
        color="black"
      />
      <BaseIcon v-else name="arrow-right" color="black" />
    </BaseButton>
  </header>
</template>
