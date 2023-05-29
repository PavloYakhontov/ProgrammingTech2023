<script setup lang="ts">
import { ref } from "vue";

const editor = ref();
const rtfValue = ref('');

defineExpose({
  rtfValue
})

</script>
<template>
  <Editor ref="editor" v-model="rtfValue" editorStyle="height: 500px"/>
</template>

<style scoped></style>
