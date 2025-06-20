// 이력서 업로드

import { fetchUploadResume } from "@/lib/fetch/file"
import { useMutation } from "@tanstack/react-query"

// POST '/resume/upload'
export const useUploadResume = () => {
    return useMutation({
        mutationFn:fetchUploadResume
    })
}
