export default function ErrorState({
  icon = 'bi-exclamation-circle',
  message,
  actionLabel,
  onAction,
}) {
  return (
    <div className="text-center py-5">
      <i className={`bi ${icon} fs-1 text-danger mb-3 d-block`} />
      <p className="mb-4">{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-dark" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
