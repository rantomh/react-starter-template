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
        const style = window.getComputedStyle(el);
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

export const useDropdown = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.bootstrap) return;

    const $bs = window.bootstrap;
    const CLASS_NAME = 'has-child-dropdown-show';

    if (!$bs?.Dropdown || !$bs?.Dropdown.prototype) return;

    // Prevent double patch
    if ($bs.Dropdown.prototype._patched) return;
    $bs.Dropdown.prototype._patched = true;

    const originalToggle = $bs.Dropdown.prototype.toggle;
    $bs.Dropdown.prototype.toggle = function () {
      document.querySelectorAll('.'.concat(CLASS_NAME)).forEach((e) => {
        e.classList.remove(CLASS_NAME);
      });

      let dd = this._element.closest('.dropdown')?.parentElement?.closest('.dropdown');
      while (dd && dd !== document.body) {
        dd.classList.add(CLASS_NAME);
        dd = dd.parentElement?.closest('.dropdown');
      }

      return originalToggle.call(this);
    };

    document.querySelectorAll('.dropdown').forEach((dd) => {
      dd.addEventListener('hide.bs.dropdown', function (e) {
        if (dd.classList.contains(CLASS_NAME)) {
          dd.classList.remove(CLASS_NAME);
          e.preventDefault();
        }
        e.stopPropagation();
      });
    });

    document.querySelectorAll('.dropdown-hover, .dropdown-hover-all .dropdown').forEach((dd) => {
      dd.addEventListener('mouseenter', function (e) {
        const target = e.target as HTMLElement;
        const toggle = target?.querySelector(':scope>[data-bs-toggle="dropdown"]');
        if (toggle && !toggle.classList.contains('show')) {
          $bs.Dropdown.getOrCreateInstance(toggle as HTMLElement).toggle();
          dd.classList.add(CLASS_NAME);
          $bs.Dropdown.clearMenus();
        }
      });

      dd.addEventListener('mouseleave', function (e) {
        const target = e.target as HTMLElement;
        const toggle = target?.querySelector(':scope>[data-bs-toggle="dropdown"]');
        if (toggle && toggle.classList.contains('show')) {
          $bs.Dropdown.getOrCreateInstance(toggle as HTMLElement).toggle();
        }
      });
    });
  }, []);
};

export { useObserver, useRefObserver };
