import { useMutation } from "@tanstack/react-query"
import { registerApi } from "@/services/authService"

export const useRegister = () => {

  return useMutation({
    mutationFn: registerApi
  })

}