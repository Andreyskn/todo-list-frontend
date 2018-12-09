import styled from 'styled-components';

export const Task__ = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 10px;

	& + & {
		margin-top: 5px;
	}
`;
