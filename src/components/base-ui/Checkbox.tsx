import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface CheckboxProps {
	className?: string;
	checked: boolean;
	onChange: () => any;
}

const StyledCheckbox = styled.input`
	width: 24px;
	height: 24px;
`;

export function Checkbox({ className, checked, onChange }: CheckboxProps): ReactElement<CheckboxProps> {
	return (
		<div className={className}>
			<StyledCheckbox type='checkbox' checked={checked} onChange={onChange} />
		</div>
	);
}
