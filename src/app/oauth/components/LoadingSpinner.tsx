'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner({
  text = '로그인 처리 중입니다...',
}: {
  text?: string;
}) {
  return (
    <div className='flex flex-col items-center p-10'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className='w-9 h-9 border-4 border-gray-200 border-t-gray-800 rounded-full mb-2'
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        style={{
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
      />
      <p className='text-gray-600 mt-2'>{text}</p>
    </div>
  );
}
