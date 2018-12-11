import React, { ReactElement } from 'react';

import { Button__ } from './styled';

import { EditIcon, AddIcon, SaveIcon, CrossIcon } from 'Icons';

interface ButtonProps {
  text?: string;
  onClick: () => any;
  styleMode?: 'tab-switcher' | 'tab-close' | 'tab-add' | 'round' | 'task-add' | 'save' | 'remove';
  icon?: 'edit' | 'add' | 'save' | 'cross';
}

const icons = {
  edit: <EditIcon />,
  add: <AddIcon />,
  save: <SaveIcon />,
  cross: <CrossIcon />,
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
