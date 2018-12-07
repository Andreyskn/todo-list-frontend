import styled from 'styled-components';

const Component = styled.div`
	display: flex;
	margin-right: 5px;
`;

const Checkbox = styled.input`
	width: 24px;
	height: 24px;
`;

Component.Checkbox = Checkbox;

export { Component };
