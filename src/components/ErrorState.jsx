export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) {
  return (
    <div className="state" role="alert">
      <span className="state__icon" aria-hidden="true">⚠️</span>
      <h2>{message}</h2>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
