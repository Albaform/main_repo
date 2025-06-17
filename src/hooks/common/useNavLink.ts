import { useEffect, useState } from 'react';

export const useNavLink = (
  isLoginPage: boolean,
  pathname: string,
  role: string | undefined,
) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const NavItems = {
    default: [
      {
        label: '알바 목록',
        commonUrl: '/albaform',
      },
      {
        label: '알바 토크',
        commonUrl: '/albatalk',
      },
      {
        label: '내 알바폼',
        ownerUrl: '/myAlbaform/owner',
        applicantUrl: '/myAlbaform/applicant',
      },
    ],
    login: [
      {
        label: '사장님 전용',
        url: '/signin/owner',
      },
      {
        label: '지원자 전용',
        url: '/signin/applicant',
      },
    ],
  };

  useEffect(() => {
    if (isLoginPage) {
      const activeItem = NavItems.login.find((item) =>
        pathname.includes(item.url),
      );
      setActiveMenu(activeItem?.label ?? '');
    } else {
      const activeItem = NavItems.default.find((item) => {
        const url =
          item.commonUrl ??
          (role === 'OWNER' ? item.ownerUrl : item.applicantUrl);
        return url && pathname.includes(url);
      });
      setActiveMenu(activeItem?.label ?? '');
    }
  }, [pathname, role]);

  return { activeMenu, setActiveMenu, NavItems };
};
