import styled, { css } from 'styled-components';

export const Input__ = styled.input`
  width: 400px;
  border: none;
  background: none;
  margin: 0 20px;
  border-bottom: 1px solid #c1b6b6;

  ${({ modifier }) => modifier && applyModifier(modifier)}
`;

const applyModifier = (modifier) => {
  switch (modifier) {
    case 'done':
      return css`
        opacity: 0.4;
      `;
  }
};
