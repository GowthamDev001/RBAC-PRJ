import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateArticleApi } from "@/services/articleService"
import { showSuccess, showError } from "@/utils/notification"

export const useUpdateArticle = () => {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: updateArticleApi,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["articles"]
      })

      showSuccess("Article updated")

    },

    onError: (err: any) => {
      showError(err?.response?.data?.message || "Update failed")
    }

  })

}