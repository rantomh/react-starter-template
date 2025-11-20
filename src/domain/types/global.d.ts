interface Window {
  bootstrap: {
    Modal: {
      new (element: HTMLElement): { show: () => void; hide: () => void };
      getInstance(element: HTMLElement): { show: () => void; hide: () => void } | null;
    };

    Tooltip: {
      new (element: HTMLElement): { show: () => void; hide: () => void; dispose: () => void };
      getInstance(element: HTMLElement): { show: () => void; hide: () => void; dispose: () => void } | null;
    };

    Dropdown: {
      prototype: {
        toggle: () => void;
        _element: HTMLElement;
        _patched?: boolean;
      };
      new (element: HTMLElement): {
        toggle: () => void;
      };
      getInstance: (element: HTMLElement) => {
        toggle: () => void;
      } | null;
      getOrCreateInstance: (element: HTMLElement) => {
        toggle: () => void;
      };
      clearMenus: () => void;
    };
  };

  goTo: (path: string) => void;

  t: (k: string) => k;
}
