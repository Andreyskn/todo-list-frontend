import React, { ReactElement, FocusEvent } from 'react';

import { Input__ } from './styled';

interface InputProps {
	className?: string;
	text: string;
	onChange: (e: any) => any;
	onBlur: (e: FocusEvent) => any;
}

export function Input({ className, text, onChange, onBlur }: InputProps): ReactElement<InputProps> {
	return <Input__ type='text' className={className} value={text} onChange={onChange} onBlur={(e) => onBlur(e)} />;
}
