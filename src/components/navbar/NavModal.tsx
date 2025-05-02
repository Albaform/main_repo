import { MouseEvent } from "react"
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";


const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0; 
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end; 
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  width: 560px; 
  height: 100vh; 
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CloseButtonWrapper = styled.div`
  width: 560px;
  height: 88px;
  border-bottom: 1px solid var(--gray100);
  position: relative;
`
const CloseButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  top: 26px;
  right: 56px;
  position: absolute;
`;
const closeButtonImg = '/images/X.png';

const ModalContent = styled.div`
  font-size: 20px;
  width: 100%;
  height: 100px;
  padding: 32px 56px;
  display: flex;
  align-items: center;
  gap: 24px;
  cursor: pointer;
  

`
const myPageIcon = '/images/mypage.png';
const logoutIcon = '/images/logout.png';



export default function NavModal({ onClose }: {onClose: ()=>void}){
    const router = useRouter();
    const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) {
            onClose();
        }
    }

    return(
    <div>
      <Overlay onClick={handleBackgroundClick}>
        <ModalContainer>
          <CloseButtonWrapper>
            <CloseButton src={closeButtonImg} onClick={onClose}/>
          </CloseButtonWrapper>
          <ModalContent>
            <Image src={myPageIcon} alt="mypage" width={36} height={36} onClick={() => router.push('/mypage')}/>
            <p onClick={() => router.push('/mypage')}>마이 페이지</p>
          </ModalContent>
          <ModalContent>
            <Image src={logoutIcon} alt="logout" width={36} height={36} onClick={() => router.push('/logout')} />
            <p onClick={() => router.push('/logout')}>로그아웃</p>
          </ModalContent>
        </ModalContainer>
      </Overlay>

        
        
    </div>

    )
}