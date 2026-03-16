import { useQuery } from "@tanstack/react-query"
import { getArticlesApi } from "@/services/articleService"

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticlesApi
  })
}