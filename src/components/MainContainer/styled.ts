import styled from 'styled-components';

export const MainContainer__ = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  animation: appear 0.2s linear;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  background-color: #a0cda0;
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

MainContainer__.Content = Content;
