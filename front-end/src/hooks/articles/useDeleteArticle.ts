import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteArticleApi } from "@/services/articleService"
import { showSuccess, showError } from "@/utils/notification"

export const useDeleteArticle = () => {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: deleteArticleApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["articles"]
      })

      showSuccess("Article deleted")

    },

    onError: (err: any) => {
      showError(err?.response?.data?.message || "Delete failed")
    }

  })

}