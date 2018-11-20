import React, { ReactElement, FocusEvent } from 'react';

interface TextareaProps {
	text: string,
	onChange: (e: any) => any,
	onBlur: (e: FocusEvent) => any,
}

export function Textarea(props: TextareaProps): ReactElement<TextareaProps> {
	return (
		<div>
			<textarea cols={30} rows={1} value={props.text} onChange={props.onChange} onBlur={e => props.onBlur(e)} />
		</div>
	)
}
