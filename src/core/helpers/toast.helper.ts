import { Bounce, ToastOptions, toast } from 'react-toastify';
import { generateHash } from '../utils/security.util';

const defaultOptions: ToastOptions = {
  transition: Bounce,
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
};

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

function showToast(type: ToastType, message: string, additionalOptions?: ToastOptions) {
  const toastId = generateHash(message);
  if (!toast.isActive(toastId)) {
    if (type === 'default') {
      toast(message, { toastId, ...defaultOptions, ...additionalOptions });
    } else {
      toast[type](message, { toastId, ...defaultOptions, ...additionalOptions });
    }
  }
}

export const toastify = {
  info(message: string, additionalOptions?: ToastOptions) {
    showToast('info', message, additionalOptions);
  },
  success(message: string, additionalOptions?: ToastOptions) {
    showToast('success', message, additionalOptions);
  },
  warning(message: string, additionalOptions?: ToastOptions) {
    showToast('warning', message, additionalOptions);
  },
  error(message: string, additionalOptions?: ToastOptions) {
    showToast('error', message, additionalOptions);
  },
  default(message: string, additionalOptions?: ToastOptions) {
    showToast('default', message, additionalOptions);
  },
};
