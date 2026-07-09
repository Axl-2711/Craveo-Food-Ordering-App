import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/restaurants?q=${encodeURIComponent(category.label)}`} className="category-card">
      <span className="category-card__icon" aria-hidden="true">{category.image}</span>
      <span>{category.label}</span>
    </Link>
  );
}
