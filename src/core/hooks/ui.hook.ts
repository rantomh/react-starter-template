import { RefObject, useEffect, useRef } from 'react';

const useRefObserver = (modalRef: RefObject<HTMLDivElement>): ((reset: () => void) => void) => {
  const resetRef = useRef<() => void>();
  const isFirstCheck = useRef(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isFirstCheck.current) {
          isFirstCheck.current = false;
          return;
        }
        if (!entry.isIntersecting) {
          resetRef.current?.();
        }
      },
      { threshold: 0 },
    );
    if (modalRef.current) {
      observer.observe(modalRef.current);
    }
    return () => observer.disconnect();
  }, [modalRef]);

  return (reset: () => void) => {
    resetRef.current = reset;
  };
};

const useObserver = (): [RefObject<HTMLDivElement>, (reset: () => void) => void] => {
  const ref = useRef<HTMLDivElement>(null);
  const setReset = useRefObserver(ref);
  return [ref, setReset];
};

export const useAutofocusFirstInput = () => {
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const form = ref.current;
    if (!form) return;
    const focusFirstInput = () => {
      const nodes = Array.from(
        form.querySelectorAll<HTMLElement>(
          `
          input:not([type="hidden"]):not([disabled]):not([readonly]),
          textarea:not([disabled]):not([readonly]),
          select:not([disabled]):not([readonly]),
          .ql-editor[contenteditable="true"],
          input[aria-describedby^="react-select-"]
        `,
        ),
      );
      const firstVisible = nodes.find((el) => {
        const style = globalThis.getComputedStyle(el);
        return style.display !== 'none' && el.offsetParent !== null;
      });
      firstVisible?.focus();
    };
    const modalElement = form.closest('.modal');
    if (modalElement) {
      const onModalShown = () => {
        setTimeout(focusFirstInput, 10);
      };
      modalElement.addEventListener('shown.bs.modal', onModalShown);
      if (modalElement.classList.contains('show')) {
        setTimeout(focusFirstInput, 10);
      }
      return () => {
        modalElement.removeEventListener('shown.bs.modal', onModalShown);
      };
    } else {
      setTimeout(focusFirstInput, 10);
    }
  }, []);
  return ref;
};

export { useObserver, useRefObserver };
