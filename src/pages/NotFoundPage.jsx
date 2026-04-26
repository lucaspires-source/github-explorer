import { useNavigate } from 'react-router-dom';

import ErrorState from '../components/ErrorState.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <ErrorState
      icon="bi-compass"
      message={t('common.pageNotFound')}
      actionLabel={t('common.goHome')}
      onAction={() => navigate('/')}
    />
  );
}
