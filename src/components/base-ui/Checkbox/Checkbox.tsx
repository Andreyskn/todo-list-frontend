import React, { ReactElement } from 'react';

import { Component } from './styled';

interface CheckboxProps {
	className?: string;
	checked: boolean;
	onChange: () => any;
}

export function Checkbox({ className, checked, onChange }: CheckboxProps): ReactElement<CheckboxProps> {
	return (
		<Component>
			<Component.Checkbox type='checkbox' checked={checked} onChange={onChange} />
		</Component>
	);
}
