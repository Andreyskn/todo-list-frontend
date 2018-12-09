import styled, { css } from 'styled-components';

export const Button__ = styled.div`
	display: flex;

	${({ modifier }) => modifier && applyContainerModifier(modifier)}
`;

const Button = styled.button`
	outline: none;
	cursor: pointer;

	& > svg {
		width: 20px;
	}

	${({ modifier }) => modifier && applyButtonModifier(modifier)}
`;

const Span = styled.span`
	display: flex;
	white-space: nowrap;
	overflow: hidden;
`;

const applyContainerModifier = (modifier) => {
	switch (modifier) {
		case 'spaced':
			return css`
				margin-left: 5px;
			`;
		case 'tab-switcher':
			return css`
				width: 100%;
				height: 100%;
			`;
		case 'tab-close':
			return css`
				border-radius: 50%;
				position: absolute;
				top: 5px;
				right: 3px;

				:hover {
					background-color: darkgray;
				}
			`;
		case 'tab-add':
			return css`
				border-radius: 50%;
				flex-shrink: 0;
				width: 26px;
				height: 26px;
				margin-top: 2px;
				transition-duration: 0.25s;

				:hover {
					background-color: #c3c3c354;
				}
			`;
	}
};

const applyButtonModifier = (modifier) => {
	switch (modifier) {
		case 'tab-switcher':
			return css`
				background: none;
				border: none;
				width: 100%;
				height: 100%;
				padding: 0 30px 0 10px;
				text-align: left;
			`;
		case 'tab-close':
			return css`
				background: none;
				border: none;
			`;
		case 'tab-add':
			return css`
				background: none;
				border: none;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;
			`;
	}
};

Button__.Button = Button;
Button__.Span = Span;
