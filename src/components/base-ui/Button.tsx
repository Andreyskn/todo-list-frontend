import React, { ReactElement } from 'react';

interface ButtonProps {
	text: string,
	onClick: () => any,
}

export function Button(props: ButtonProps): ReactElement<ButtonProps> {
	return (
		<div>
			<button onClick={props.onClick}>{props.text}</button>
		</div>
	)
}
