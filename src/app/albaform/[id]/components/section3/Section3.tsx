import Image from 'next/image';
import { InfiniteScrollResponsive } from '../../styles';

export default function Section3() {
  return (
    <>
      <div className='w-full h-2 bg-line-100' />
      <InfiniteScrollResponsive>
        <p className='text-3xl font-semibold mb-10'>지원 현황</p>
        <div className=''>
          <table className='w-full table-auto border border-gray-200'>
            <thead className='border-b border-solid border-line-100 text-black100'>
              <tr>
                <th className='p-2 font-light'>이름</th>
                <th className='p-2 font-light'>전화번호</th>
                <th className='p-2 font-light cursor-pointer'>
                  경력
                  <div className='inline-block align-middle p-1 border border-solid border-line-100 rounded-[8px] ml-1'>
                    <Image
                      src='/images/albaformDetail/sort.svg'
                      alt='정렬'
                      width={24}
                      height={24}
                    />
                  </div>
                </th>
                <th className='p-2 font-light cursor-pointer'>
                  상태
                  <div className='inline-block align-middle p-1 border border-solid border-line-100 rounded-[8px] ml-1'>
                    <Image
                      src='/images/albaformDetail/sort.svg'
                      alt='정렬'
                      width={24}
                      height={24}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {sortedUsers.map((user) => ( */}
              <tr key={''} className='text-center text-black400'>
                <td className='p-2 underline'>이름</td>
                <td className='p-2'>번호</td>
                <td className='p-2'>경력</td>
                <td className='p-2'>상태</td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </InfiniteScrollResponsive>
    </>
  );
}
