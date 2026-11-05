import { useCallback, useEffect, useState } from 'react';
import ReviewForm from '@/components/ReviewForm';
import ReviewList, { type ReviewsStatus } from '@/components/ReviewList';
import SectionHeading from '@/components/SectionHeading';
import StarRating from '@/components/StarRating';
import { TESTIMONIALS, type Testimonial } from '@/data/site';
import { getInitials } from '@/lib/format';
import { fetchReviews, type Review } from '@/lib/reviews';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<ReviewsStatus>('loading');

  const loadReviews = useCallback(async () => {
    setStatus('loading');
    try {
      setReviews(await fetchReviews());
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  const allRatings = [...TESTIMONIALS.map((t) => t.rating), ...reviews.map((r) => r.rating)];
  const averageRating = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;

  return (
    <section id="resenas" className="section-anchor bg-rosa-900 px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Reseñas"
          title="Lo que dicen nuestros comensales"
          description="Historias reales de quienes ya disfrutaron Flamante."
          tone="dark"
        />

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
          <span className="font-display text-5xl text-white">{averageRating.toFixed(1)}</span>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <StarRating value={Math.round(averageRating)} size="lg" />
            <span className="text-sm text-rosa-100">Promedio de {allRatings.length} calificaciones</span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-10">
          <ReviewForm onSubmitted={loadReviews} />
          <ReviewList reviews={reviews} status={status} onRetry={loadReviews} />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-cacao-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={testimonial.photo}
          alt={`Experiencia de ${testimonial.name} en Flamante`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-800 text-cacao-900 shadow-sm backdrop-blur">
          Experiencia Flamante
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <StarRating value={testimonial.rating} />
        <blockquote className="mt-5 flex-1 text-base leading-[1.5] text-cacao-800">
        &ldquo;{testimonial.comment}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-cacao-900/10 pt-5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-cempasuchil-200 text-sm font-800 text-cacao-900">
          {getInitials(testimonial.name)}
        </span>
        <div>
          <p className="font-800 text-cacao-900">{testimonial.name}</p>
          <p className="text-xs text-cacao-500">{testimonial.city}</p>
        </div>
      </figcaption>
      </div>
    </figure>
  );
}
