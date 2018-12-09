import styled from 'styled-components';

const Task__ = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 10px;

	& + & {
		margin-top: 5px;
	}
`;

export { Task__ };
