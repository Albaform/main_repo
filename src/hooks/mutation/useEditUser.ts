// 회원정보 수정 및 업데이트
// PATCH 'users/me'

import { fetchEditUser } from "@/lib/fetch/user"
import { useMutation } from "@tanstack/react-query"

export const useEditUser = () => {
    return useMutation({
        mutationFn:fetchEditUser
    })
}
