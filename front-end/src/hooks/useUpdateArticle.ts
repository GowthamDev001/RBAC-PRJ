import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateArticleApi } from "@/services/articleService"

export const useUpdateArticle = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateArticleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
    }
  })

}