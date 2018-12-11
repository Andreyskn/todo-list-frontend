import styled from 'styled-components';

export const TaskList__ = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  position: relative;
  overflow: auto;
  padding: 20px;
`;

const NewTaskButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

TaskList__.NewTaskButton = NewTaskButton;
