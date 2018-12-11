import styled from 'styled-components';

export const Task__ = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  padding: 10px;
  background: linear-gradient(to top, #f7f7f7, #e7e7e7);
  border-radius: 50px;
  padding: 15px;
  box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;

  & + & {
    margin-top: 15px;
  }
`;
