'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined')
    return (
      <>
        <GlobalStyle />
        {children}
      </>
    );

  return (
    <StyleSheetManager sheet={sheet.instance}>
      {children as React.ReactElement}
    </StyleSheetManager>
  );
}
