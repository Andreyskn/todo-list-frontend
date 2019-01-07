import styled, { css } from 'styled-components';

export const Sidebar__ = styled.div`
  width: 200px;
  background-color: cadetblue;
  flex-shrink: 0;
  padding: 10px 0;
`;

const Button = styled.div`
  height: 40px;
  color: #eaeaea;
  transition-duration: 0.2s;
  background-color: rgba(0, 0, 0, 0.1);

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #c9c9c9 !important;
      color: cadetblue;
    `};
`;

Sidebar__.Button = Button;
