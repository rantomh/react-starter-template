import React, { useContext } from 'react';

type LangueHook = {
  t: (k: string, p?: object) => string;
};

export const LangueContext = React.createContext<LangueHook>({ t: (k: string) => k });

export const useLangue = (): LangueHook => useContext(LangueContext);
