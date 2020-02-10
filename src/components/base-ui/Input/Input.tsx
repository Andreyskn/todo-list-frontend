import React, { ReactElement, FocusEvent } from 'react';

import { Input__ } from './styled';

interface InputProps {
  className?: string;
  text: string;
  styleMode?: 'done';
  onChange: (e: any) => any;
  onKeyDown: (e: any) => any;
  onBlur: (e: FocusEvent) => any;
}

export function Input({
  className,
  text,
  onChange,
  onKeyDown,
  onBlur,
  styleMode,
}: InputProps): ReactElement<InputProps> {
  return (
    <Input__
      type='text'
      autoFocus
      className={className}
      modifier={styleMode}
      value={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={(e) => onBlur(e)}
    />
  );
}
