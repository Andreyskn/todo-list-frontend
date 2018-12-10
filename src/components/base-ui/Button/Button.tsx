import React, { ReactElement } from 'react';

import { Button__ } from './styled';

import { EditIcon, AddIcon } from 'Icons';

interface ButtonProps {
  text?: string;
  onClick: () => any;
  styleMode?: 'spaced' | 'tab-switcher' | 'tab-close' | 'tab-add' | 'round' | 'task-add';
  icon?: 'edit' | 'add';
}

const icons = {
  edit: <EditIcon />,
  add: <AddIcon />,
};

export function Button({ text, onClick, styleMode, icon }: ButtonProps): ReactElement<ButtonProps> {
  return (
    <Button__ modifier={styleMode}>
      <Button__.Button onClick={onClick} modifier={styleMode}>
        {text && <Button__.Span>{text}</Button__.Span>}
        {icon && icons[icon]}
      </Button__.Button>
    </Button__>
  );
}
