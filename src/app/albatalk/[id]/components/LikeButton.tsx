import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { LikeButtonProps } from '../types';

export default function LikeButton({
  post,
  postId,
  toggleLikePost,
  isPending,
}: LikeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedIsLiked, setClickedIsLiked] = useState(false);

  const handleClickLike = () => {
    toggleLikePost({
      postId,
      isLiked: post.isLiked,
    });
    setClickedIsLiked(post.isLiked);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3500);
  };

  const colors = [
    'bg-pink-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-purple-400',
  ];

  return (
    <>
      <button
        onClick={handleClickLike}
        disabled={isPending}
        className='
      flex items-center gap-2 px-4 py-1.5 rounded-full border border-solid border-gray-100 
      bg-white active:scale-95 disabled:cursor-not-allowed
    '
      >
        <Image
          src={
            post?.likeCount ? '/images/iconLike.svg' : '/images/iconUnLike.svg'
          }
          alt='좋아요'
          width={24}
          height={10}
          className='mr-[1px]'
        />
        <AnimatePresence mode='popLayout'>
          {' '}
          <motion.span
            key={post?.likeCount}
            initial={
              !post?.likeCount ? { y: -10, opacity: 0 } : { y: 10, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {post?.likeCount}
          </motion.span>
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {isAnimating && !clickedIsLiked && (
          <>
            {Array.from({ length: 10 }).map((_, i) => {
              const colorClass = colors[i % colors.length];
              const randomX = (Math.random() - 0.5) * 200;
              const randomY = (Math.random() - 0.5) * 200;
              const randomRotate = Math.random() * 360;

              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: randomX,
                    y: randomY,
                    rotate: randomRotate,
                    scale: 1.5,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`absolute w-4 h-4 rounded-full ${colorClass} z-10`}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
