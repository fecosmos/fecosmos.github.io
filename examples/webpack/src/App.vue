<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
</script>
<template>
  <div>count: {{ count }}</div>
  <button @click="count++">Increment</button>
</template>
