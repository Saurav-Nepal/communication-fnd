import { ExternalToast, toast } from 'sonner';

interface ToastMessageInterFace extends ExternalToast {
    message: string | React.ReactNode;
}

export class Toast {
    static info({
        message,
        richColors = true,
        position = 'bottom-left',
        duration = 3000,
        closeButton = false,
        dismissible = true,
        classNames,
        ...props
    }: ToastMessageInterFace) {
        toast.info(message, {
            position,
            duration,
            closeButton,
            dismissible,
            richColors,

            ...props,
        });
    }

    static success({
        message,
        duration = 3000,
        dismissible = true,
        richColors = true,
        closeButton = false,
        position = 'bottom-left',
        ...props
    }: ToastMessageInterFace) {
        toast.success(message, {
            duration,
            dismissible,
            richColors,
            closeButton,
            position,
            ...props,
        });
    }

    static error({
        message,
        duration = 3000,
        dismissible = true,
        closeButton = false,
        richColors = true,
        position = 'bottom-left',
        ...props
    }: ToastMessageInterFace) {
        toast.error(message, {
            duration,
            dismissible,
            richColors,
            closeButton,
            position,
            ...props,
        });
    }

    static warning({
        message,
        duration = 3000,
        dismissible = true,
        richColors = true,
        closeButton = false,
        position = 'bottom-left',
        ...props
    }: ToastMessageInterFace) {
        toast.warning(message, {
            duration,
            dismissible,
            richColors,
            closeButton,
            position,
            ...props,
        });
    }

    static loading({
        message,
        duration = 3000,
        dismissible = true,
        classNames,
        closeButton = false,
        position = 'bottom-left',
        ...props
    }: ToastMessageInterFace) {
        return toast.loading(message, {
            duration,
            dismissible,
            closeButton,
            position,
            ...props,
        });
    }

    static dismiss(id: number | string) {
        toast.dismiss(id);
    }

    static dismissAll() {
        toast.getHistory().forEach((t) => toast.dismiss(t.id));
    }
}
