import { useNavigate } from 'react-router-dom';

import { useLanguage } from '../context/LanguageContext.jsx';

export default function BackButton({ to, children }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <div className="mb-3">
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleClick}>
        <i className="bi bi-arrow-left me-1" />
        {children ?? t('common.back')}
      </button>
    </div>
  );
}
