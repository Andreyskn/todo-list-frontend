import React from 'react';

export function Button(props) {
	return (
		<div>
			<button onClick={props.onClick}>{props.text}</button>
		</div>
	)
}
