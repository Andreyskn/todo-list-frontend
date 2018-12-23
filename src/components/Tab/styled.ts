import styled from 'styled-components';

export const Tab__ = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Header = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: 10px 110px;
  font-size: 18px;
  font-weight: bold;
  height: 60px;
  justify-content: center;
  background: #699e6b;
  position: relative;
  border-radius: 30px;
  margin: 10px;
`;

const Title = styled.span`
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Input = styled.input`
  flex-grow: 1;
  background: none;
  border: 1px solid transparent;
  border-bottom-color: #000;
  outline: none;
  text-align: center;
`;

const Settings = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 5px;
  z-index: 1;
`;

Tab__.Header = Header;
Tab__.Title = Title;
Tab__.Input = Input;
Tab__.Settings = Settings;
