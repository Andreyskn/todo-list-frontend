import styled from 'styled-components';

export const NoteEditor__ = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
`;

const Input = styled.input`
  background: none;
  border: 1px solid transparent;
  border-bottom-color: #000;
  margin-bottom: 10px;
  height: 32px;
  font-size: 18px;
  padding: 0 5px;
  outline-color: white;
`;

const Textarea = styled.textarea`
  border: none;
  background: none;
  resize: none;
  flex-grow: 1;
  padding: 5px;
  outline-color: white;
`;

NoteEditor__.Input = Input;
NoteEditor__.Textarea = Textarea;
