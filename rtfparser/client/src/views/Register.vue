<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getToastService } from '@/core/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/user';

const username = ref('');
const password = ref('');
const password2 = ref('');
const toast = getToastService(useToast());
const router = useRouter();
const userstore = userStore();

async function onSubmit() {
    if (password.value !== password2.value) {
        toast.error('Passwords must be identical', 'Passwords mismatch');
        return;
    }
    try {
        const uname = username.value;
        await userstore.registerUser({ username: username.value, password: password.value });
        toast.success(`Successfully registered user: ${uname}`);
        toast.info('Redirected to authentication page');
        router.push({name: 'login'})
    } catch(err: any) {
        toast.error(err.message);
    }
}

onMounted(() => {
    console.log(userstore.getUser)
    if (userstore.getUser) {
        toast.info('Logout to create new account');
        router.push('/editor');
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
                            <span class="text-600 font-medium">Sign up to continue</span>
                        </div>

                        <div>
                            <label for="username1" class="block text-900 text-xl font-medium mb-2">Username</label>
                            <InputText required id="username1" type="text" placeholder="Enter username"
                                class="w-full md:w-30rem mb-3" v-model="username" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password required id="password1" v-model="password" placeholder="Enter password" :toggleMask="true"
                                class="w-full mb-3" inputClass="w-full"></Password>

                            <label for="password2" class="block text-900 font-medium text-xl mb-2">Repeat password</label>
                            <Password required id="password2" :feedback="false" v-model="password2" placeholder="Repeat password"
                                :toggleMask="true" class="w-full mb-3" inputClass="w-full">
                            </Password>
                            <Button type="submit" label="Sign Up" class="w-full p-3 text-xl mt-3"></Button>
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
