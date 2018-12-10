import styled, { css } from 'styled-components';

export const TabSwitchButton__ = styled.div`
  display: flex;
  margin-right: 5px;
  width: 200px;
  position: relative;
  background-color: gray;
  border-radius: 8px 8px 0 0;

  ${({ active }) => {
    return (
      active &&
      css`
        background-color: lightgray;

        ::before,
        ::after {
          content: '';
          position: absolute;
          top: 0;
          width: 5px;
          height: 100%;
          background-color: #565859;
          box-shadow: 0px 10px 0px 0px lightgray;
        }

        ::before {
          right: 100%;
          border-bottom-right-radius: 8px;
        }

        ::after {
          left: 100%;
          border-bottom-left-radius: 8px;
        }
      `
    );
  }}
`;
