import React from 'react';

export function Checkbox(props) {
	return (
		<div>
			<input type="checkbox" checked={props.checked} onChange={props.onChange} />
		</div>
	)
}
