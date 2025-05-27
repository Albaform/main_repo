import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { UserDataProps, InfoWatchedFields } from '../types';
import { formattedStoreTel } from '@/utils/formattedStoreTel';
import { formattedPhoneNumber } from '@/utils/formattedPhoneNumber';

export default function useFormChangeDetector(props: {
  watched: InfoWatchedFields;
  setValue: UseFormSetValue<InfoWatchedFields>;
  user?: UserDataProps;
}) {
  const { watched, setValue, user } = props;

  useEffect(() => {
    if (user) {
      setValue('imageUrl', user.imageUrl || '');
      setValue('name', user.name || '');
      setValue('nickname', user.nickname || '');
      setValue('store', user.storeName || '');
      setValue('storeTel', user.storePhoneNumber || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('address', user.location || '');
    }
  }, [user, setValue]);

  const isModified =
    watched.imageUrl !== user?.imageUrl ||
    watched.name !== user?.name ||
    watched.nickname !== user?.nickname ||
    watched.store !== user?.storeName ||
    watched.storeTel !== formattedStoreTel(user?.storePhoneNumber) ||
    watched.phoneNumber !== formattedPhoneNumber(user?.phoneNumber) ||
    watched.address !== user?.location;

  return { isModified };
}
