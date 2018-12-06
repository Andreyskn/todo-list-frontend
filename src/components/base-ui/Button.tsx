import React, { ReactElement } from 'react';

interface ButtonProps {
	className?: string;
	text: string;
	onClick: () => any;
}

export function Button({ className, text, onClick }: ButtonProps): ReactElement<ButtonProps> {
	return (
		<div className={className}>
			<button onClick={onClick}>{text}</button>
		</div>
	);
}
