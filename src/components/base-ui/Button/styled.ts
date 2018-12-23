import styled, { css } from 'styled-components';

export const Button__ = styled.div`
  display: flex;

  ${({ modifier }) => modifier && applyContainerModifier(modifier)}
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background: none;

  & > svg {
    width: 16px;
  }

  ${({ modifier }) => modifier && applyButtonModifier(modifier)}
`;

const Span = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const applyContainerModifier = (modifier) => {
  switch (modifier) {
    case 'tab-switcher':
      return css`
        width: 100%;
        height: 100%;
      `;
    case 'tab-close':
      return css`
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 3px;

        :hover {
          background-color: darkgray;
        }
      `;
    case 'tab-add':
      return css`
        border-radius: 50%;
        flex-shrink: 0;
        width: 26px;
        height: 26px;
        margin-top: 2px;
        transition-duration: 0.25s;

        :hover {
          background-color: #c3c3c354;
        }
      `;
    case 'settings':
      return css`
        position: absolute;
        right: 10px;
        top: 8px;
      `;
    case 'rename':
      return css`
        position: absolute;
        right: 60px;
        top: 8px;
      `;
    case 'task-add':
      return css`
        position: fixed;
        right: 10%;
        bottom: 10%;
      `;
  }
};

const applyButtonModifier = (modifier) => {
  switch (modifier) {
    case 'tab-switcher':
      return css`
        width: 100%;
        height: 100%;
        padding: 0 30px 0 10px;
        text-align: left;
      `;
    case 'tab-close':
      return css`
        /* */
      `;
    case 'tab-add':
      return css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
      `;
    case 'rename':
    case 'settings':
      return css`
        ${roundButtonStyles}
      `;
    case 'task-add':
      return css`
        ${roundButtonStyles}

        width: 70px;
        height: 70px;

        & > svg {
          width: 30px;
        }
      `;
    case 'save':
      return css`
        padding: 0;
        width: 60px;

        & > svg {
          width: 35px;
        }
      `;
    case 'remove':
      return css`
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        padding: 0;

        :hover {
          background: linear-gradient(to top, #c1c1c1, #e5e5e5);
          box-shadow: 0px 2px 4px #aaa, inset 0px 3px 7px #fff;
        }
      `;
  }
};

const roundButtonStyles = `
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	background: linear-gradient(to top, #f7f7f7, #e7e7e7);
	width: 40px;
	height: 40px;
	border-radius: 50%;
	box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;
	border: none;

	:hover {
		background: #f5f5f5;
	}

	:active {
		transform: translateY(1px);
	}
`;

Button__.Button = Button;
Button__.Span = Span;
