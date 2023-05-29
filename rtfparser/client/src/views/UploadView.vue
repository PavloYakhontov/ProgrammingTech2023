<script setup lang="ts">
import { ref } from 'vue';
import UploadComponent from '@/components/UploadComponent.vue';
import ButtonsUploadComponent from '@/components/ButtonsUploadComponent.vue';

const uploadComponent = ref();

function handleRtfConvertion(toFormat: string) {
  uploadComponent.value.toFormat = toFormat;
}
</script>
<template>
  <h1>flameless's RTF Uploader</h1>
  <UploadComponent ref="uploadComponent"/>
  <ButtonsUploadComponent @convertion-click="handleRtfConvertion"/>
</template>
<style scoped>
h1 {
  text-align: center;
}
</style>
