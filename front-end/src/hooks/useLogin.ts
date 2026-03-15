import { useMutation } from "@tanstack/react-query"
import { loginApi } from "../services/authService"

export const useLogin = () => {

  return useMutation({
    mutationFn: loginApi
  })

}