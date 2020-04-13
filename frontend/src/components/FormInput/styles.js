import styled, { css, keyframes } from 'styled-components';

import colors from '../../styles/colors';

const expandError = keyframes`
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: 14px;
    opacity: 1;
  }
`;

export const InputWrapper = styled.div`
  background: ${colors.container};
  height: 44px;
  padding: 0 15px;
  margin: 5px 0 0;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  transition: border-color 0.2s linear;

  svg {
    margin-right: 10px;
    transition: fill 0.2s linear;
  }

  input {
    width: 100%;
    color: ${colors.primaryText};
    font-size: 16px;
    background: none;
    border: 0;

    ::placeholder {
      color: ${colors.secondaryText};
    }
  }

  &:focus-within {
    border-color: ${colors.primary};

    svg {
      fill: ${colors.primary};
    }
  }
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${colors.error};
  margin-top: 5px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0;

  label {
    font-weight: bold;
    margin: 5px 0;
    font-weight: bold;
    color: ${colors.primaryText};
  }

  ${InputWrapper} {
    ${(props) =>
      props.error &&
      css`
        border: 1px solid ${colors.error};

        svg {
          fill: ${colors.error};
        }
      `}
  }

  ${ErrorMessage} {
    ${(props) =>
      props.error &&
      css`
        animation: ${expandError} 0.3s ease-in-out;
      `}
  }
`;
