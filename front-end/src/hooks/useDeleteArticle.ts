import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteArticleApi } from "@/services/articleService"

export const useDeleteArticle = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteArticleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
    }
  })

}