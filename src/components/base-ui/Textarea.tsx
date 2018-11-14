import React from 'react';

export function Textarea(props) {
	return (
		<div>
			<textarea cols={30} rows={1} value={props.text} onChange={props.onChange} onBlur={e => props.onBlur(e)} />
		</div>
	)
}
