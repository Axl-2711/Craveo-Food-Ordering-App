export default function EmptyState({ icon = '🍽️', title = 'No restaurants found.', message, action }) {
  return (
    <div className="state">
      <span className="state__icon" aria-hidden="true">{icon}</span>
      <h2>{title}</h2>
      {message && <p className="muted">{message}</p>}
      {action}
    </div>
  );
}
