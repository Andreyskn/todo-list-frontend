import styled from 'styled-components';

const Wrapper = styled.div`
	display: inline-flex;
	align-items: center;
	padding: 10px;

	& + & {
		margin-top: 5px;
	}
`;

export { Wrapper };
