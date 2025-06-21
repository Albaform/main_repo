import { TextInputProps } from '../../types';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';

export default function TextInputcontainer({
  label,
  name,
  type,
  placeholder,
  formLogic,
  handleDraftChange,
}: TextInputProps) {
  const { form } = formLogic;
  const { register, formState, setValue } = form;
  const { errors } = formState;

  return (
    <div className='mb-[50px]'>
      <label htmlFor={name} className='inline-block mb-4'>
        {label} <span className='text-orange-400 ml-1'>*</span>
      </label>
      <input
        id={name}
        inputMode={name === 'phoneNumber' ? 'numeric' : 'none'}
        {...register(name)}
        placeholder={placeholder}
        type={type}
        onWheel={(e) => name === 'experienceMonths' && e.currentTarget.blur()}
        onChange={(e) => {
          handleDraftChange?.(e);

          const onlyNums = e.target.value.replace(/[^0-9]/g, '');
          const formatted = formattedPhoneNumber(onlyNums);
          name === 'phoneNumber'
            ? setValue('phoneNumber', formatted, {
                shouldValidate: true,
              })
            : name === 'name' || name === 'experienceMonths'
            ? setValue(name, e.target.value, {
                shouldValidate: true,
              })
            : '';
        }}
        className='w-full h-14 bg-gray-100 rounded-[8px] px-[14px] py-4 text-[18px]'
      />
      {errors[name]?.message && (
        <p className='text-left mt-[10px] text-red'>{errors[name]?.message}</p>
      )}
    </div>
  );
}
