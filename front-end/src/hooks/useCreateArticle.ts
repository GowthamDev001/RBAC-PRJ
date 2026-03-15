import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createArticleApi } from "@/services/articleService"

export const useCreateArticle = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createArticleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
    }
  })

}