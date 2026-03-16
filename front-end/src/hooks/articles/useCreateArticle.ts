import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createArticleApi } from "@/services/articleService"
import { showSuccess, showError } from "@/utils/notification"

export const useCreateArticle = () => {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: createArticleApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      showSuccess("Article created successfully")
    },

    onError: (err: any) => {
      showError(err?.response?.data?.message || "Create failed")
    }

  })

}