import { AlertCircle, MessageSquareText, RefreshCw } from 'lucide-react';
import StarRating from '@/components/StarRating';
import type { Review } from '@/lib/reviews';
import { formatReviewDate, getInitials } from '@/lib/format';

export type ReviewsStatus = 'loading' | 'ready' | 'error';

interface ReviewListProps {
  reviews: Review[];
  status: ReviewsStatus;
  onRetry: () => void;
}

export default function ReviewList({ reviews, status, onRetry }: ReviewListProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl text-cacao-900">Opiniones de la comunidad</h3>
        <span className="rounded-full bg-cempasuchil-100 px-3 py-1 text-xs font-800 text-cacao-800">
          {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
        </span>
      </div>

      {status === 'loading' && (
        <div className="space-y-4" aria-busy="true" aria-label="Cargando reseñas">
          {[0, 1, 2].map((key) => (
            <div key={key} className="h-32 animate-pulse rounded-2xl bg-crema-200" />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="flex flex-col items-start gap-4 rounded-2xl bg-error-50 p-6 ring-1 ring-error-100">
          <div className="flex items-center gap-3 text-error-700">
            <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="text-sm">No pudimos cargar las reseñas en este momento.</p>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full bg-error-700 px-5 py-2.5 text-sm font-800 text-white transition duration-300 hover:bg-error-500"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Reintentar
          </button>
        </div>
      )}

      {status === 'ready' && reviews.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-cacao-900/20 p-8 text-center">
          <MessageSquareText className="h-8 w-8 text-rosa-500" aria-hidden="true" />
          <p className="text-sm text-cacao-500">Todavía no hay reseñas. Sé la primera persona en compartir su experiencia.</p>
        </div>
      )}

      {status === 'ready' && reviews.length > 0 && (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="animate-fade-up rounded-2xl bg-white p-5 shadow-sm ring-1 ring-cacao-900/5 transition duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-rosa-100 text-sm font-800 text-rosa-700">
                    {getInitials(review.name)}
                  </span>
                  <div>
                    <p className="font-800 text-cacao-900">{review.name}</p>
                    <p className="text-xs text-cacao-500">{formatReviewDate(review.createdAt)}</p>
                  </div>
                </div>
                <StarRating value={review.rating} />
              </div>
              <p className="mt-4 text-sm leading-[1.5] text-cacao-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
