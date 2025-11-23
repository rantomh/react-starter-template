import { AlertTriangle, ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  message?: string;
  redirectPath?: string;
}

const ErrorSection: FC<Props> = ({ title, message, redirectPath = '/' }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(redirectPath);
  };
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon">
          <AlertTriangle />
        </div>
        <h1 className="error-title">{title}</h1>
        <p className="error-message">{message}</p>
        <button onClick={handleRedirect} className="error-button">
          Go Back
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ErrorSection;
