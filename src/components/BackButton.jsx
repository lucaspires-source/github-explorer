import { useNavigate } from 'react-router-dom';

export default function BackButton({ to, children = 'Back' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <div className="mb-3">
      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleClick}>
        <i className="bi bi-arrow-left me-1" />
        {children}
      </button>
    </div>
  );
}
