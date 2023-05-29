import type { ToastServiceMethods } from 'primevue/toastservice';

class Toast {
    toast: ToastServiceMethods
    constructor(toast: ToastServiceMethods) {
        this.toast = toast;
    }

    info(msg: string, summary='Info') {
        this.toast.add({ severity: 'info', summary: summary, detail: msg, life: 3000 });
    }

    error(msg: string, summary='Error') {
        this.toast.add({ severity: 'error', summary: summary, detail: msg, life: 3000 });
    }

    success(msg: string, summary='Success') {
        this.toast.add({ severity: 'success', summary: summary, detail: msg, life: 3000 });
    }

    warning(msg: string, summary='Warning') {
        this.toast.add({ severity: 'warn', summary: summary, detail: msg, life: 3000 });
    }
}

export function getToastService(toastService: ToastServiceMethods) {
    return new Toast(toastService);
}
