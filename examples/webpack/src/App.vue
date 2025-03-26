<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
</script>
<template>
  <div>count: {{ count }}</div>
  <img src="./assets/react.svg" />

  <button @click="count++">Increment</button>
</template>
<style scoped lang="scss">
button {
  background-color: blue;
  width: 200px;
  text-align: center;
}
</style>
