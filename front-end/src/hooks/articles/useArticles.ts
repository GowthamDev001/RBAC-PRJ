import { useQuery } from "@tanstack/react-query";
import { getArticlesApi } from "@/services/articleService";

export const useArticles = (page: number, limit = 6) => {
  return useQuery<any>({
    queryKey: ["articles", page, limit],
    queryFn: () => getArticlesApi(page, limit),
    staleTime: 1000 * 60 * 2,
  });
};