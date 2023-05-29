<script setup lang="ts">
import { ref, onMounted } from 'vue';
import RtfEditor from '../components/RtfEditor.vue'
import ButtonsUploadComponent from '../components/ButtonsUploadComponent.vue';
import { UPLOAD_URI, type FileFormats } from '../core/constants.ts'
import { htmlToRtf } from 'heron-html-to-rtf'
import { userStore } from '@/stores/user';
import { saveAs } from 'file-saver'
import { useRouter } from 'vue-router';
import { getToastService } from '@/core/toast';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const editor = ref();
const store = userStore();
const router = useRouter();
const toast = getToastService(useToast());
const userstore = userStore();

function uploader(event: any, toFormat: string) {
  const files = event.files;
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'x-User-UUID': store.getUUID,
    'x-from-format': '.rtf',
    'x-to-format': toFormat,
    'Access-Control-Allow-Origin': '*'
  } 
  const responseType = 'arraybuffer';
  axios({method: 'post', url: UPLOAD_URI, data: formData, headers: headers, responseType: responseType}).then(response => {
    const blob = new Blob([response.data], {type: 'application/x-zip-compressed'});
    saveAs(blob, "upload.zip")
  });
}

async function hanldeRtfConvertation(toFormat: string) {
  const rtfString = editor.value.rtfValue;
  console.log(htmlToRtf)
  const rtfText = htmlToRtf.convertHtmlToRtf(rtfString);
  const rtfBlob = new Blob([rtfText], { type: 'application/rtf' });
  const file = new File([rtfBlob], 'test.rtf', { type: 'application/rtf' })
  uploader({files: [file]}, toFormat);
}

onMounted(() => {
  if (!userstore.getUser) {
    toast.warning('Authorize to use editor');
    router.push('/upload');
  }

})
</script>

<template>
  <h1>flameless's RTF Editor</h1>
  <RtfEditor ref="editor"/>
  <ButtonsUploadComponent @convertion-click="hanldeRtfConvertation"/>
</template>

<style scoped>
h1 {
  text-align: center;
}

.conver-box Button {
  margin-left: 5px;
  margin-top: 5px;
}
</style>
