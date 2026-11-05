import { supabase } from '@/lib/supabase';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewRow {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ReviewInput {
  name: string;
  rating: number;
  comment: string;
}

export async function fetchReviews(limit = 30): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, rating, comment, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as ReviewRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  }));
}

export async function submitReview(input: ReviewInput): Promise<void> {
  const { error } = await supabase.from('reviews').insert({
    name: input.name,
    rating: input.rating,
    comment: input.comment,
  });

  if (error) {
    throw new Error(error.message);
  }
}
