import styled from 'styled-components';

export const Task__ = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  padding: 10px;

  & + & {
    margin-top: 5px;
  }
`;
