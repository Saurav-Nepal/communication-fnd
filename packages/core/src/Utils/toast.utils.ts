import { SHOW_TOAST } from '../Constants';
import { StoreEvent } from './stateManager.utils';

interface ToastParams {
    onClose?: () => void | unknown;
    onCancel?: () => void | unknown;
    onTap?: () => void | unknown;
    delay?: number;
    position?: string;
    description?: string;
    title?: string;
}

function broadCastToast(toastParams: ToastParams, type: string) {
    const params = { ...toastParams, type };
    StoreEvent({ eventName: SHOW_TOAST, data: params });
}

export class Toast {
    static success(toastParams: ToastParams) {
        broadCastToast(toastParams, 'success');
    }
    static info(toastParams: ToastParams) {
        broadCastToast(toastParams, 'info');
    }
    static warning(toastParams: ToastParams) {
        broadCastToast(toastParams, 'warn');
    }
    static error(toastParams: ToastParams) {
        broadCastToast(toastParams, 'error');
    }
    static loading(toastParams: ToastParams) {
        broadCastToast(toastParams, 'loading');
    }
}

// function success()
