import React, { ReactElement, FocusEvent } from 'react';

interface InputProps {
	className?: string;
	text: string;
	onChange: (e: any) => any;
	onBlur: (e: FocusEvent) => any;
}

export function Input({ className, text, onChange, onBlur }: InputProps): ReactElement<InputProps> {
	return <input type='text' className={className} value={text} onChange={onChange} onBlur={e => onBlur(e)} />
}
