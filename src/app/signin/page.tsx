'use client';

import { useState } from 'react';
import PopUp from '@/components/tooltip/PopUp';
import Tooltip from '@/components/tooltip/ToolTip';

export default function SignIn() {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && <Tooltip onClose={() => setShow(false)}>ToolTip Modal</Tooltip>}
    </>
  );
}
