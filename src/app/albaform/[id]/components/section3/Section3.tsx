import Image from 'next/image';
import { InfiniteScrollResponsive } from '../../styles';
import { useState } from 'react';
import { useGetApplications } from '@/hooks/query/useGetApplications';
import { useInfiniteScroll } from '@/hooks/common/useInfiniteScroll';
import { calcExperienceMonths } from '@/utils/calcExperienceMonths';
import { useRouter } from 'next/navigation';

export default function Section3({ formId }: { formId: number }) {
  const [orderByExperience, setOrderByExperience] = useState<'asc' | 'desc'>(
    'asc',
  );
  const [orderByStatus, setOrderByStatus] = useState<'asc' | 'desc'>('asc');

  const router = useRouter();

  const {
    data: applications,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGetApplications(formId, orderByExperience, orderByStatus);

  const listData =
    applications?.pages.flatMap((page) => page.result ?? []) ?? [];

  const observerRef = useInfiniteScroll(hasNextPage!, fetchNextPage);

  return (
    <>
      <div className='w-full h-2 bg-line-100' />
      <InfiniteScrollResponsive>
        <p className='text-3xl font-semibold mb-10'>지원 현황</p>
        <div className=''>
          {listData?.length > 0 ? (
            <table className='w-full table-auto border border-gray-200'>
              <thead className='border-b border-solid border-line-100 text-black100'>
                <tr>
                  <th className='p-2 font-light'>이름</th>
                  <th className='p-2 font-light'>전화번호</th>
                  <th
                    className='p-2 font-light cursor-pointer'
                    onClick={() =>
                      setOrderByExperience((prev) =>
                        prev === 'asc' ? 'desc' : 'asc',
                      )
                    }
                  >
                    경력
                    <div className='inline-block align-middle p-1 border border-solid border-line-100 rounded-[8px] ml-1'>
                      <Image
                        src={`/images/albaformDetail/${
                          orderByExperience === 'asc'
                            ? 'sortActive.svg'
                            : 'sort.svg'
                        }`}
                        alt='정렬'
                        width={24}
                        height={24}
                      />
                    </div>
                  </th>
                  <th
                    className='p-2 font-light cursor-pointer'
                    onClick={() =>
                      setOrderByStatus((prev) =>
                        prev === 'asc' ? 'desc' : 'asc',
                      )
                    }
                  >
                    상태
                    <div className='inline-block align-middle p-1 border border-solid border-line-100 rounded-[8px] ml-1'>
                      <Image
                        src={`/images/albaformDetail/${
                          orderByStatus === 'asc'
                            ? 'sortActive.svg'
                            : 'sort.svg'
                        }`}
                        alt='정렬'
                        width={24}
                        height={24}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {listData?.map((user) => (
                  <tr
                    key={user.id}
                    className='text-center text-black400 cursor-pointer transition duration-200 hover:bg-gray-100'
                    onClick={() =>
                      router.push(`/applications/${user.id}?formId=${formId}`)
                    }
                  >
                    <td className='p-2 underline'>{user.name}</td>
                    <td className='p-2'>{user.phoneNumber}</td>
                    <td className='p-2'>
                      {calcExperienceMonths(user.experienceMonths)}
                    </td>
                    <td className='p-2'>
                      {user.status === ''
                        ? '전체'
                        : user.status === 'REJECTED'
                        ? '거절'
                        : user.status === 'INTERVIEW_PENDING'
                        ? '면접 대기'
                        : user.status === 'INTERVIEW_COMPLETED'
                        ? '면접 완료'
                        : user.status === 'HIRED'
                        ? '채용 완료'
                        : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='flex flex-col items-center justify-center text-gray-400 mt-[50px] mb-[30px]'>
              <Image
                src='/images/empty/albaform.svg'
                alt='Loading...'
                width={80}
                height={80}
                className='mb-3'
              />
              아직 아무도 지원하지 않았어요
            </div>
          )}
        </div>
        {(isLoading || isFetchingNextPage) && (
          <div className='text-center mt-5 justify-items-center'>
            <Image
              src='/images/loader.gif'
              alt='Loading...'
              width={50}
              height={30}
            />
          </div>
        )}
      </InfiniteScrollResponsive>
      {hasNextPage && <div ref={observerRef} style={{ height: '1px' }} />}
    </>
  );
}
