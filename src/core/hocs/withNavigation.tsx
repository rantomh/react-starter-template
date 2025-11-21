import { useNavigate } from 'react-router-dom';
import { useLangue } from '@core/hooks/langue.hook';

const withNavigation = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const navigate = useNavigate();
    const { t } = useLangue();

    window.goTo = (path: string): void => {
      navigate(path);
    };

    window.t = t;

    return <WrappedComponent {...props} />;
  };
};

export default withNavigation;
