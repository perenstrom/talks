<script setup>
import { ref, watch } from "vue";
const myVar = ref("Hello world");

watch(myVar, (newVal, oldVal) => {

  console.log("myVar changed from", oldVal, "to", newVal);
});
</script>

<template>
  <p>MyVar is {{ myVar }}</p>
  <button @click="myVar = 'Hello world 2'">Update myVar</button>
</template>
