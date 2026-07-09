/**
 * Food "image" placeholder.
 * Real product images would be <img> tags; this project uses styled
 * emoji tiles so the UI never shows broken images and loads instantly.
 */
const GRADIENTS = [
  'linear-gradient(135deg, #ffe9c7, #ffc9a3)',
  'linear-gradient(135deg, #ffd9d9, #ffb3b3)',
  'linear-gradient(135deg, #d9f2e3, #a7e3c5)',
  'linear-gradient(135deg, #e3e0ff, #c3bcff)',
  'linear-gradient(135deg, #fff2c2, #ffe08a)',
  'linear-gradient(135deg, #d6ecff, #a9d6ff)',
];

export default function Thumb({ emoji, label, variant = 'card', seed = 0 }) {
  const background = GRADIENTS[Math.abs(seed) % GRADIENTS.length];
  return (
    <div className={`thumb thumb--${variant}`} style={{ background }} role="img" aria-label={label}>
      <span aria-hidden="true">{emoji}</span>
    </div>
  );
}
