export interface CreateReviewPayload {
  article_id: string
  rating: number
  review: string
}

export interface UpdateReviewPayload {
  id: string
  rating: number
  review: string
}