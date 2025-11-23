import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { removeItem, restoreCryptedItem } from '@core/infrastructure/localStorage';

export const usePageTokenValidation = (removeTokenAfterCheck = true): boolean => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [validated, setValidated] = useState(false);
  const hasValidatedRef = useRef(false);
  const confirmationToken = searchParams.get('token');
  const storedToken = restoreCryptedItem('temp_token');
  const isValid = useMemo(() => {
    return !!confirmationToken && !!storedToken && confirmationToken === storedToken;
  }, [confirmationToken, storedToken]);
  useEffect(() => {
    if (hasValidatedRef.current) return;
    if (isValid) {
      hasValidatedRef.current = true;
      setValidated(true);
      if (removeTokenAfterCheck) {
        removeItem('temp_token');
        if (searchParams.has('token')) {
          searchParams.delete('token');
          setSearchParams(searchParams, { replace: true });
        }
      }
    }
  }, [isValid, removeTokenAfterCheck, searchParams, setSearchParams]);
  return validated;
};

export const useRemoveQueryParams = (): (() => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  return () => {
    navigate(location.pathname, { replace: true });
  };
};
