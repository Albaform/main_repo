// 지원하기

import { fetchApplications } from "@/lib/fetch/application";
import { useMutation } from "@tanstack/react-query";

// POST 'forms/:formId/applications'
export const useApplications = () => {
    return useMutation({
        mutationFn:fetchApplications
    })
};
