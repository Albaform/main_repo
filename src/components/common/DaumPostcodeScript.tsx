'use client';

import Script from 'next/script';

export default function DaumPostcodeScript() {
  return (
    <Script
      src='https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
      strategy='afterInteractive'
    />
  );
}
