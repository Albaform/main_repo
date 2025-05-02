import { MouseEvent } from "react"
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 검은색 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 580px;
  text-align: center;
  height: 100%;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;



export default function NavModal({ onClose }: {onClose: ()=>void}){

    const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return(
    <div>
      <Overlay>
        <ModalContainer>
          <CloseButton />
        </ModalContainer>
      </Overlay>

        
        
    </div>

    )
}