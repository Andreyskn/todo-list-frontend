import React, { ReactElement } from 'react';

interface CheckboxProps {
	checked: boolean,
	onChange: () => any,
}

export function Checkbox(props: CheckboxProps): ReactElement<CheckboxProps> {
	return (
		<div>
			<input type="checkbox" checked={props.checked} onChange={props.onChange} />
		</div>
	)
}
