import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import StarRating from '@/components/StarRating';
import { submitReview } from '@/lib/reviews';

interface ReviewFormProps {
  onSubmitted: () => void;
}

const RATING_LABELS = ['', 'Malo', 'Regular', 'Bueno', 'Muy bueno', '¡Excelente!'];
const COMMENT_MIN = 10;
const COMMENT_MAX = 600;
const NAME_MAX = 80;

const inputClass =
  'w-full rounded-xl border border-cacao-900/15 bg-white px-4 py-3 text-cacao-900 placeholder:text-cacao-500/60 transition duration-200 focus:border-rosa-500 focus:outline-none focus:ring-4 focus:ring-rosa-500/15';

export default function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ name?: string; rating?: string; comment?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    const found: typeof errors = {};
    if (trimmedName.length < 2) found.name = 'Escribe tu nombre (mínimo 2 caracteres).';
    if (rating === 0) found.rating = 'Selecciona una calificación de 1 a 5 estrellas.';
    if (trimmedComment.length < COMMENT_MIN) found.comment = `Tu opinión debe tener al menos ${COMMENT_MIN} caracteres.`;
    setErrors(found);
    setServerError(null);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await submitReview({ name: trimmedName, rating, comment: trimmedComment });
      setPublished(true);
      setName('');
      setRating(0);
      setComment('');
      onSubmitted();
    } catch {
      setServerError('No pudimos publicar tu reseña. Inténtalo de nuevo en unos minutos.');
    } finally {
      setSubmitting(false);
    }
  };

  if (published) {
    return (
      <div className="animate-fade-up flex flex-col items-center gap-4 rounded-3xl bg-verde-50 p-8 text-center ring-1 ring-verde-200">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-verde-500 text-white">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl text-verde-900">¡Gracias por tu opinión!</h3>
        <p className="text-sm text-verde-800">Tu reseña ya aparece en la lista de la comunidad.</p>
        <button
          type="button"
          onClick={() => setPublished(false)}
          className="rounded-full bg-verde-600 px-6 py-3 text-sm font-800 text-white transition duration-300 hover:bg-verde-700"
        >
          Escribir otra reseña
        </button>
      </div>
    );
  }

  const ratingText = RATING_LABELS[rating] || 'Toca una estrella';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-cacao-900/5 sm:p-8">
      <div>
        <h3 className="font-display text-2xl text-cacao-900">Cuéntanos tu experiencia</h3>
        <p className="mt-1 text-sm text-cacao-500">Tu opinión nos ayuda a seguir mejorando.</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-800 text-cacao-800">Tu calificación</p>
        <div className="flex flex-wrap items-center gap-4">
          <StarRating value={rating} onChange={setRating} size="lg" label="Calificación con estrellas" />
          <span
            className="min-w-[7.5rem] rounded-full bg-cempasuchil-100 px-3 py-1 text-center text-sm font-800 text-cacao-900 transition-all duration-300"
            aria-live="polite"
          >
            {ratingText}
          </span>
        </div>
        {errors.rating && <p className="text-sm text-error-700">{errors.rating}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="reviewName" className="text-sm font-800 text-cacao-800">Tu nombre</label>
        <input
          id="reviewName"
          type="text"
          maxLength={NAME_MAX}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Sofía López"
          aria-invalid={Boolean(errors.name)}
          className={inputClass}
        />
        {errors.name && <p className="text-sm text-error-700">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="reviewComment" className="text-sm font-800 text-cacao-800">Tu opinión</label>
          <span className={`text-xs font-600 ${comment.length > COMMENT_MAX - 60 ? 'text-rosa-600' : 'text-cacao-500'}`}>
            {comment.length}/{COMMENT_MAX}
          </span>
        </div>
        <textarea
          id="reviewComment"
          rows={4}
          maxLength={COMMENT_MAX}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="¿Qué platillo probaste? ¿Qué te encantó?"
          aria-invalid={Boolean(errors.comment)}
          className={`${inputClass} resize-none`}
        />
        {errors.comment && <p className="text-sm text-error-700">{errors.comment}</p>}
      </div>

      {serverError && (
        <div role="alert" className="flex items-start gap-3 rounded-xl bg-error-50 p-4 text-sm text-error-700 ring-1 ring-error-100 animate-fade-in">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rosa-500 px-6 py-4 text-base font-800 text-white shadow-lg shadow-rosa-500/30 transition duration-300 hover:-translate-y-0.5 hover:bg-rosa-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Publicando...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Publicar reseña
          </>
        )}
      </button>
    </form>
  );
}
