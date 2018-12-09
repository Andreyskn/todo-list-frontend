import React, { ReactElement } from 'react';

import { Button__ } from './styled';

interface ButtonProps {
	className?: string;
	text: string;
	onClick: () => any;
	styleMode?: 'spaced' | 'tab-switcher' | 'tab-close' | 'tab-add';
}

export function Button({ className, text, onClick, styleMode }: ButtonProps): ReactElement<ButtonProps> {
	return (
		<Button__ modifier={styleMode}>
			<Button__.Button onClick={onClick} modifier={styleMode}>
				{text && <Button__.Span>{text}</Button__.Span>}
			</Button__.Button>
		</Button__>
	);
}
