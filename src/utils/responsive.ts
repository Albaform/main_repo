const sizes = {
  desktop: '1920px',
  tablet: '1199px',
  mobile: '768px',
};

export const media = {
  desktop: `(min-width:${sizes.desktop})`,
  tablet: `(max-width:${sizes.tablet})`,
  mobile: `(max-width:${sizes.mobile})`,
};
