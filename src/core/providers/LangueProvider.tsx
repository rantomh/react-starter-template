import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LangueContext } from '@core/hooks/langue.hook';

interface Props {
  children: ReactNode;
}

const LangueProvider = (props: Props) => {
  const { t } = useTranslation();

  const value = useMemo(
    () => ({
      t: (key: string, params: object = {}): string => {
        if (!key) {
          return '';
        }
        return t(key, params);
      },
    }),
    [t],
  );
  return <LangueContext.Provider value={value}>{props.children}</LangueContext.Provider>;
};

export default LangueProvider;
