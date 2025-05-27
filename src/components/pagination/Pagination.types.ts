import { SetStateAction } from "react"

export interface PaginationProps {
    page:number;
    setPage:React.Dispatch<SetStateAction<number>>;
    totalPages:number;
}