import React, { ReactElement } from 'react';

import { Checkbox__ } from './styled';

interface CheckboxProps {
	className?: string;
	checked: boolean;
	onChange: () => any;
}

export function Checkbox({ className, checked, onChange }: CheckboxProps): ReactElement<CheckboxProps> {
	return (
		<Checkbox__>
			<Checkbox__.Checkbox type='checkbox' checked={checked} onChange={onChange} />
		</Checkbox__>
	);
}
