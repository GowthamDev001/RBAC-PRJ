export interface Article {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  updated_at: string
}

export interface CreateArticlePayload {
  title: string
  content: string,
  status: string,
  category_id:string,
}

export interface UpdateArticlePayload {
  id: string
  title: string
  content: string,
  status: string,
  category_id:string,
}

export interface ArticleResponse {
  message?: string
  article?: Article
}