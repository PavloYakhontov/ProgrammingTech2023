import { createApp } from 'vue'
import axios from 'axios'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';

// Primevue
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/soho-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import TabMenu from 'primevue/tabmenu';
import Editor from 'primevue/editor';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import ProgressBar from 'primevue/progressbar';
import Toast from 'primevue/toast';
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(PrimeVue)
app.use(ToastService);

app.component('TabMenu', TabMenu);
app.component('Editor', Editor);
app.component('Button', Button);
app.component('FileUpload', FileUpload);
app.component('ProgressBar', ProgressBar);
app.component('Toast', Toast);
app.component('Password', Password);
app.component('InputText', InputText);

app.mount('#app')
