import { Bounce, ToastOptions, toast } from 'react-toastify';

const defaultOptions: ToastOptions = {
  transition: Bounce,
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: 'light',
};

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';

function showToast(type: ToastType, message: string, additionalOptions?: ToastOptions) {
  if (type === 'default') {
    toast(message, { ...defaultOptions, ...additionalOptions });
  } else {
    toast[type](message, { ...defaultOptions, ...additionalOptions });
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
