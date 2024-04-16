import { createRoot } from 'react-dom/client';
import { Toast, type ToastProps } from '.';

import classNames from 'classnames';
import styles from './Toast.module.scss';

let toasts: HTMLDivElement[] = [];
let toastContainer: HTMLDivElement | null = null;

export const showToast = (props?: ToastProps) => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    document.body.appendChild(toastContainer);
  }

  const div: HTMLDivElement = document.createElement('div');
  toastContainer.appendChild(div);
  const containerClass = classNames(styles['container']);
  toastContainer.className = containerClass;

  const ToastClass: string = classNames(styles['toastShow']);
  div.className = ToastClass;

  const root = createRoot(div);

  root.render(
    <Toast
      {...props}
      close={() => closeToast(div)}
    ></Toast>,
  );

  toasts.push(div);

  addListener(div);
  hide(toasts);
  moreThreeClose();
  moreTimeClose(div);
};

const moreTimeClose = (div: HTMLDivElement) => {
  setTimeout(() => {
    const ToasthideClass: string = classNames(styles['toastHide']);
    div.classList.add(ToasthideClass);
    setTimeout(() => {
      if (toastContainer?.contains(div)) {
        toastContainer?.removeChild(div);
        toasts = toasts.filter((toast) => toast !== div);
      }
    }, 400);
  }, 5000);
};

const moreThreeClose = () => {
  if (toasts.length > 3) {
    toasts.shift();
    setTimeout(() => {
      while (toastContainer && toastContainer?.childNodes.length > 3 && toastContainer.firstChild) {
        toastContainer.removeChild(toastContainer.firstChild);
      }
    }, 300);
  }
};

const closeToast = (div: HTMLDivElement) => {
  setTimeout(() => {
    div.remove();
  }, 300);
  toasts = toasts.filter((toast) => toast !== div);
  addListener(div);
  expand(toasts);
};

const expand = (expandToasts: HTMLDivElement[]) => {
  expandToasts.forEach((toast: HTMLDivElement, index: number) => {
    const totalHeight = expandToasts
      .slice(0, expandToasts.length - index - 1)
      .reduce((height: number, toast: HTMLDivElement) => height + toast.offsetHeight, 0);
    toast.style.transform = `translateY(-${totalHeight}px)`;
  });
};

const hide = (hideToasts: HTMLDivElement[]) => {
  hideToasts.forEach((toast: HTMLDivElement, index: number) => {
    toast.style.transform = `translateY(-${(hideToasts.length - index - 1) * 15}px) scale(${
      0.95 ** (hideToasts.length - index - 1)
    })`;
    if (hideToasts.length - index === 4) {
      toast.style.opacity = '0';
    }
  });
};

const addListener = (div: HTMLDivElement) => {
  const handleMouseEnter = () => {
    expand(toasts);
  };

  const handleMouseLeave = () => {
    hide(toasts);
  };

  div.addEventListener('mouseenter', handleMouseEnter);
  div.addEventListener('mouseleave', handleMouseLeave);
};
