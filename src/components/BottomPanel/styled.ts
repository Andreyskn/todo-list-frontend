import styled from 'styled-components';

export const BottomPanel__ = styled.div`
  display: flex;
  background-color: white;
  position: absolute;
  bottom: 0;
  border-top-right-radius: 8px;
  height: 60px;
  padding: 0 8px;
`;

export const Indicator__ = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  height: 20px;
  width: 20px;
  pointer-events: none;

  > * {
    animation: appear 0.2s linear;
  }

  > svg {
    animation-name: appear, disappear;
    animation-duration: 0.2s;
    animation-delay: 0s, 2s;
    animation-fill-mode: none, forwards;
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes disappear {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
