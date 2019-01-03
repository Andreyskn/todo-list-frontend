import React, { ReactElement, FocusEvent } from 'react';

import { Textarea__ } from './styled';

interface TextareaProps {
  className?: string;
  text: string;
  onChange: (e: any) => any;
}

export function Textarea({ className, text, onChange }: TextareaProps): ReactElement<TextareaProps> {
  return (
    <Textarea__ className={className} cols={30} rows={1} value={text} onChange={onChange}/>
  );
}
