import Overlay from '@/components/modal/Overlay';
import Image from 'next/image';
import useChangeProfilePreview from '@/hooks/common/useChangeProfilePreview';
import { useGetMyInfo } from '@/hooks/query/useGetUser';
import EditProfileSkeleton from './EditProfileSkeleton';
import EditProfileForm from './EditProfileForm';
import { EditModalProps } from '@/app/mypage/types';
import { useEditProfileForm } from '@/app/mypage/hooks/useEditProfileForm';
import { ScrollHiddenDiv } from '@/app/mypage/styles';
import { usePathname } from 'next/navigation';

export default function EditProfileModal({
  showModal,
  setShowModal,
  handleCloseModal,
  onSuccess,
}: EditModalProps) {
  const pathname = usePathname();
  const pathOwner = pathname === '/mypage/owner';

  const { data: user, isLoading } = useGetMyInfo();

  const { isPreview, setIsPreview, handleImgChange } = useChangeProfilePreview(
    user?.imageUrl || '',
  );

  const formLogic = useEditProfileForm({
    pathOwner,
    user,
    setShowModal,
    isPreview,
    onSuccess,
  });

  return (
    <Overlay isOpen={showModal} onClose={() => setShowModal(false)}>
      <ScrollHiddenDiv className='relative w-[100%] pb-[14px] text-black-400 max-h-[calc(100vh_*_(1090/1256))] min-h-[500px] overflow-y-scroll scrollbar-hide'>
        <p className='text-[24px] font-medium max-md:text-[18px]'>
          {pathOwner ? '사장님 정보 관리' : '프로필 수정'}
        </p>
        {isLoading ? (
          <EditProfileSkeleton />
        ) : (
          <EditProfileForm
            {...formLogic}
            pathOwner={pathOwner}
            user={user}
            isPreview={isPreview}
            setIsPreview={setIsPreview}
            handleImgChange={handleImgChange}
            handleCloseModal={handleCloseModal}
          />
        )}
        {formLogic.isPending && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Image
              src='/images/loader.gif'
              alt='Loading...'
              width={80}
              height={80}
            />
          </div>
        )}
      </ScrollHiddenDiv>
    </Overlay>
  );
}
