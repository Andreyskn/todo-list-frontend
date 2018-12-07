import React, { ReactElement } from 'react';

import { Component } from './styled';

interface ButtonProps {
	className?: string;
	text: string;
	onClick: () => any;
	styleMode?: 'spaced';
}

export function Button({ className, text, onClick, styleMode }: ButtonProps): ReactElement<ButtonProps> {
	return (
		<Component modifier={styleMode}>
			<button onClick={onClick}>{text}</button>
		</Component>
	);
}
