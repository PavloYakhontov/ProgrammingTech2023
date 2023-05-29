<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios'
import { saveAs } from 'file-saver'
import { UPLOAD_URI, type FileFormats } from '../core/constants.ts'
import { userStore } from '@/stores/user';

const store = userStore()

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);
const toFormat = ref('');
const uploadButton = ref();

function uploader(event: any) {
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
    'x-to-format': toFormat.value,
    'Access-Control-Allow-Origin': '*'
  } 
  const responseType = 'arraybuffer';
  axios({method: 'post', url: UPLOAD_URI, data: formData, headers: headers, responseType: responseType}).then(response => {
    const blob = new Blob([response.data], {type: 'application/x-zip-compressed'});
    saveAs(blob, "upload.zip")
  });
}

const onRemoveTemplatingFile = (file, removeFileCallback, index: any) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear: any) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event: any) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback: any) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const formatSize = (bytes: any) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

watch(toFormat, () => {
  uploadButton.value.$el.click();
})

defineExpose({
  uploader,
  uploadEvent,
  toFormat
})
</script>
<template>
  <FileUpload :custom-upload="true" name="upload" :url="UPLOAD_URI" :multiple="true" accept=".rtf" :maxFileSize="10000000" @uploader="uploader" @select="onSelectedFiles">
    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
      <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
        <div class="flex gap-2">
          <Button @click="chooseCallback()" icon="pi pi-file" rounded outlined></Button>
          <Button ref="uploadButton" @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
          <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
        </div>
      </div>
    </template>
    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
      <div v-if="files.length > 0">
        <h5>Pending</h5>
        <div class="flex flex-wrap p-0 sm:p-5 gap-5">
          <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
            <span class="font-semibold">{{ file.name }}</span>
            <div>{{ formatSize(file.size) }}</div>
            <Badge value="Pending" severity="warning" />
            <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" />
          </div>
        </div>
      </div>

      <div v-if="uploadedFiles.length > 0">
        <h5>Completed</h5>
        <div class="flex flex-wrap p-0 sm:p-5 gap-5">
          <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
            <div>
              <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" class="shadow-2" />
            </div>
            <span class="font-semibold">{{ file.name }}</span>
            <div>{{ formatSize(file.size) }}</div>
            <Badge value="Completed" class="mt-3" severity="success" />
            <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded  severity="danger" />
          </div>
        </div>
      </div>
    </template>
    <template #empty>
      <div class="flex align-items-center justify-content-center flex-column">
        <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
        <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
      </div>
    </template>
  </FileUpload>
</template>
<style scoped>
h1 {
  text-align: center;
}
</style>
