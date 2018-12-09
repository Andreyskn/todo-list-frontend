import styled from 'styled-components';

export const Tab__ = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	font-size: 18px;
`;

const Title = styled.span`
	margin-left: 10px;
	white-space: nowrap;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Input = styled.input`
	flex-grow: 1;
	margin-left: 10px;
	background: none;
	border: none;
	border-bottom: 1px solid #000;
	outline: none;
`;

Tab__.Header = Header;
Tab__.Title = Title;
Tab__.Input = Input;
