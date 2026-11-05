import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'lg';
  label?: string;
}

const SIZE_CLASS = { sm: 'h-4 w-4', lg: 'h-9 w-9' };

export default function StarRating({ value, onChange, size = 'sm', label }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const interactive = Boolean(onChange);
  const shown = hovered || value;
  const iconClass = SIZE_CLASS[size];

  if (!interactive) {
    return (
      <div className="flex items-center gap-0.5" role="img" aria-label={`${value} de 5 estrellas`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconClass} ${star <= value ? 'fill-cempasuchil-400 text-cempasuchil-500' : 'text-cacao-900/20'}`}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label={label ?? 'Calificación'}
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
          onMouseEnter={() => setHovered(star)}
          onFocus={() => setHovered(star)}
          onBlur={() => setHovered(0)}
          onClick={() => onChange?.(star)}
          className="rounded-full p-1 transition duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rosa-500/30 active:scale-95"
        >
          <Star
            className={`${iconClass} transition-colors duration-200 ${
              star <= shown ? 'fill-cempasuchil-400 text-cempasuchil-500' : 'text-cacao-900/20'
            }`}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
