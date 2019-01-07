import styled from 'styled-components';

export const NotePreview__ = styled.div`
  width: 800px;
  margin: 0 auto;
  max-width: calc(100% - 160px);
  border: 1px solid black;
  border-radius: 6px;
  display: flex;
  height: 50px;
  justify-content: space-between;
  transition-duration: 0.2s;

  :hover {
    border-color: green;
  }

  & + & {
    margin-top: 10px;
  }
`;
