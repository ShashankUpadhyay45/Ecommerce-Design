import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, size = 'w-4 h-4', showScore = false, count = null }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>
      {showScore && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {rating.toFixed(1)}
        </span>
      )}
      {count !== null && (
        <span className="text-xs text-slate-400 dark:text-slate-500">
          ({count})
        </span>
      )}
    </div>
  );
};

