import styled, { css } from 'styled-components';

const Component = styled.div`
	${({ modifier }) => modifier && applyModifier(modifier)}
`;

const applyModifier = (modifier) => {
	switch (modifier) {
		case 'spaced':
			return css`
				margin-left: 5px;
			`;
	}
};

export { Component };
