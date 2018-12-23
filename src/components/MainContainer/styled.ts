import styled from 'styled-components';

export const MainContainer__ = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  background-color: #a0cda0;
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

MainContainer__.Content = Content;
