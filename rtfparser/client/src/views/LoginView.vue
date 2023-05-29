<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getToastService } from '@/core/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/user';

const username = ref('');
const password = ref('');
const toast = getToastService(useToast());
const router = useRouter();
const userstore = userStore()

async function onSubmit() {
    try {
        const uname = username.value;
        await userstore.loginUser({ username: username.value, password: password.value });
        toast.success(`Successfully authorized as user: ${uname}`);
        toast.info('Redirected to the editor page');
        router.push('/editor');
    } catch(err: any) {
        throw err
    }
}

onMounted(() => {
    if (userstore.getUser) {
        toast.info('Already authorized');
        router.push('/');
    }
})

</script>

<template>
    <form @submit.prevent="onSubmit">
        <div class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden">
            <div class="flex flex-column align-items-center justify-content-center">
                <div
                    style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Welcome Guest!</div>
                            <span class="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label for="usename1" class="block text-900 text-xl font-medium mb-2">Usename</label>
                            <InputText required id="usename1" type="text" placeholder="Enter username" class="w-full md:w-30rem mb-5"
                                v-model="username" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password required id="password1" :feedback="false" v-model="password" placeholder="Enter password"
                                :toggleMask="true" class="w-full mb-3" inputClass="w-full">
                            </Password>

                            <div class="flex align-items-center justify-content-between mb-5 gap-5">
                                <router-link to="/register" class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    style="color: var(--primary-color)">No account? Create here</router-link>
                            </div>
                            <Button type="submit" label="Sign In" class="w-full p-3 text-xl"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}</style>
