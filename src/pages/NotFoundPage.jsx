import ErrorState from '../components/ErrorState.jsx';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ErrorState
      icon="bi-compass"
      message="Page not found."
      actionLabel="Go home"
      onAction={() => navigate('/')}
    />
  );
}
