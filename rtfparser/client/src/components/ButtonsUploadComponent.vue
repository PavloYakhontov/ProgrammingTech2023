<script setup lang="ts">
const emits = defineEmits(['convertionClick']);
import { FileFormats } from '@/core/constants'
</script>
<template>
  <div class="conver-box flex flex-wrap">
    <Button @click="emits('convertionClick', FileFormats.HTML)" label="RTF to HTML"/>
    <Button @click="emits('convertionClick', FileFormats.MD)" label="RTF to Markdown"/>
    <Button @click="emits('convertionClick', FileFormats.DOCX)" label="RTF to Docx"/>
    <Button @click="emits('convertionClick', FileFormats.TXT)" label="RTF to TXT"/>
    <Button @click="emits('convertionClick', FileFormats.JSON)" label="RTF to JSON"/>
    <Button @click="emits('convertionClick', FileFormats.PPTX)" label="RTF to Power Point"/>
    <Button @click="emits('convertionClick', FileFormats.MAN)" label="RTF to Man Page"/>
  </div>
</template>
<style scoped>
.conver-box Button {
  margin-left: 5px;
  margin-top: 5px;
}
</style>

