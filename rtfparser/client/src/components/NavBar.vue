<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    label: 'Editor',
    icon: 'pi pi-fw pi-file-edit',
    to: { name: 'editor' }
  },
  {
    label: 'Uploader',
    icon: 'pi pi-fw pi-upload',
    to: { name: 'upload' }
  }
]);
</script>
<template>
  <TabMenu :model="items" />
</template>
<style scoped></style>
