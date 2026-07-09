/** Skeleton cards shown while the service layer resolves. */
export default function Loading({ message = 'Finding delicious food...', count = 8 }) {
  return (
    <div aria-live="polite">
      <p className="state-message">{message}</p>
      <div className="grid grid--restaurants">
        {Array.from({ length: count }).map((_, index) => (
          <div className="card skeleton-card" key={index}>
            <div className="skeleton skeleton--media" />
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line skeleton--short" />
          </div>
        ))}
      </div>
    </div>
  );
}
