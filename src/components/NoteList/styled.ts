import styled from 'styled-components';
import ReactModal from 'react-modal';

export const Modal__ = styled(ReactModal)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: calc(100vh - 100px);
  width: calc(100% - 50px);
  max-width: 1300px;
  border-radius: 8px;
  background-color: #d3d3d3;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
`;
