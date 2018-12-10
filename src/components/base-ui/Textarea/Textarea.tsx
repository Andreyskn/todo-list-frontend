import React, { ReactElement, FocusEvent } from 'react';

import { Textarea__ } from './styled';

interface TextareaProps {
  className?: string;
  text: string;
  onChange: (e: any) => any;
  onBlur: (e: FocusEvent) => any;
}

export function Textarea({ className, text, onChange, onBlur }: TextareaProps): ReactElement<TextareaProps> {
  return (
    <Textarea__ className={className} cols={30} rows={1} value={text} onChange={onChange} onBlur={(e) => onBlur(e)} />
  );
}
