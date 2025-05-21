import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { EditProfileInput } from '@/schemas/editProfileSchema';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';
import { formattedStoreTel } from '@/utils/formattedStoreTel';
import { UserDataProps } from '../types';

interface Props {
  user: UserDataProps;
  setValue: UseFormSetValue<EditProfileInput>;
}

export default function useInitializeUserForm({ user, setValue }: Props) {
  useEffect(() => {
    if (user?.phoneNumber) {
      const onlyNums = user.phoneNumber.replace(/[^0-9]/g, '');
      const formatted = formattedPhoneNumber(onlyNums);
      setValue('phoneNumber', formatted);
    }

    if (user?.storePhoneNumber) {
      const onlyNums = user.storePhoneNumber.replace(/[^0-9]/g, '');
      const formatted = formattedStoreTel(onlyNums);
      setValue('storeTel', formatted);
    }

    if (user?.nickname) {
      setValue('nickname', user.nickname);
    }

    if (user?.storeName) {
      setValue('store', user.storeName);
    }
  }, [user, setValue]);
}
