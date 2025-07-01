import { forwardRef, useState } from 'react';
import Image from 'next/image';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  /** @TODO */
  hasError?: boolean; // 작동이 잘 되지 않아 추후 추가 예정
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = 'text',
      label,
      placeholder = '',
      className = '',
      hasError,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className='flex flex-col'>
        <label htmlFor={id} className='block text-xl font-normal text-black400'>
          {label}
        </label>
        <div className='relative mt-[16px]'>
          <input
            id={id}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            placeholder={placeholder}
            ref={ref}
            className={`w-full border-solid border border-gray-300 rounded-lg px-[14px] py-4 pr-12 ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'
              aria-label='비밀번호 보기 토글'
            >
              {showPassword ? (
                <Image
                  src='/images/visibility_on.svg'
                  alt='password unvisible'
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src='/images/visibility_off.svg'
                  alt='password visible'
                  width={24}
                  height={24}
                />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
