import { TextInputProps } from '../../types';

export default function TextInputcontainer({
  label,
  name,
  type,
  placeholder,
}: TextInputProps) {
  return (
    <>
      <label htmlFor={name} className='inline-block mb-4'>
        {label} <span className='text-orange-400 ml-1'>*</span>
      </label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className='w-full h-14 mb-[50px] bg-gray-100 rounded-[8px] px-[14px] py-4 text-[18px]'
      />
    </>
  );
}
