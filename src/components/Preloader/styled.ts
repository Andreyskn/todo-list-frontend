import styled, { css } from 'styled-components';

export const Preloader__ = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  max-width: 100%;
  max-height: 100%;
  animation: spin 1.5s linear infinite;

  ${({ size }) =>
    size &&
    size === 'small' &&
    css`
      border-color: #d4d8f1;
      border-top-color: #3498db;
      border-width: 5px;
    `}

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

Preloader__.Container = Container;
