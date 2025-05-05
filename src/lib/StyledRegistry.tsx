'use client';

import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { useServerInsertedHTML } from 'next/navigation';
import GlobalStyle from '../styles/globalStyle';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sheet] = useState(() => {
    if (typeof window !== 'undefined') return null;
    return new ServerStyleSheet();
  });

  useServerInsertedHTML(() => {
    if (!sheet) return null;
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 클라이언트
  if (typeof window !== 'undefined') {
    return (
      <>
        <GlobalStyle />
        {children}
      </>
    );
  }

  // 서버
  return (
    <StyleSheetManager sheet={sheet!.instance}>
      <>
        <GlobalStyle />
        {children}
      </>
    </StyleSheetManager>
  );
}
