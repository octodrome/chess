<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div>
    <div class="mt-5 mb-5">{{ text }}</div>
    <slot></slot>
  </div>
</template>