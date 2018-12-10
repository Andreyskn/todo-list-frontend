import styled from 'styled-components';

export const Tab__ = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;

const Header = styled.div`
	display: flex;
	flex-shrink: 0;
	align-items: center;
	padding: 10px 60px;
	font-size: 18px;
	font-weight: bold;
	height: 60px;
	justify-content: center;
	background: white;
	position: relative;
`;

const Title = styled.span`
	white-space: nowrap;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Input = styled.input`
	flex-grow: 1;
	background: none;
	border: 1px solid transparent;
	border-bottom-color: #000;
	outline: none;
	text-align: center;
`;

Tab__.Header = Header;
Tab__.Title = Title;
Tab__.Input = Input;
