const sizes = {
  desktop: '1920px',
  tabletPC: '1199px',
  tablet: '768px',
  mobile: '480px',
};

export const media = {
  desktop: `(min-width:${sizes.desktop})`,
  tabletPC: `(max-width:${sizes.tabletPC})`,
  tablet: `(max-width:${sizes.tablet})`,
  mobile: `(max-width:${sizes.mobile})`,
};
