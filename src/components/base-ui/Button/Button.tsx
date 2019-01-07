/// <reference path='../../../typings/custom.d.ts'/>
import React, { ReactElement } from 'react';

import { Button__ } from './styled';

import { Edit, Add, Save, Cross, Settings } from 'Icons';

interface ButtonProps {
  text?: string;
  onClick: () => any;
  styleMode?:
    | 'tab-switcher'
    | 'tab-close'
    | 'tab-add'
    | 'rename'
    | 'task-add'
    | 'save'
    | 'remove'
    | 'settings'
    | 'nav'
    | 'note'
    | 'remove-note';
  icon?: 'edit' | 'add' | 'save' | 'cross' | 'settings';
}

const icons = {
  edit: <Edit />,
  add: <Add />,
  save: <Save />,
  cross: <Cross />,
  settings: <Settings />,
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
