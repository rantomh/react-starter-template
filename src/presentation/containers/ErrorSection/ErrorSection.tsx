import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  message?: string;
  redirectPath: string;
}

const ErrorSection: FC<Props> = ({ redirectPath }) => {
  return (
    <div>
      <p>NotFound</p>
      <Link to={redirectPath} className="btn rounded-pill pxp-section-cta">
        Go Home<span className="fa fa-angle-right"></span>
      </Link>
    </div>
  );
};

export default ErrorSection;
