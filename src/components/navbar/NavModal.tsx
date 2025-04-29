import { MouseEvent } from "react"


export default function NavModal({ onClose }: {onClose: ()=>void}){

    const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return(
    <div>
        
        
    </div>

    )
}