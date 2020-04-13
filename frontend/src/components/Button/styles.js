import styled, { css, keyframes } from 'styled-components';
import { darken } from 'polished';

import colors from '../../styles/colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const DefaultButton = styled.button`
  height: 44px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  background: ${colors.primary};
  border: 0;
  border-radius: 4px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: background 0.2s;
  position: relative;

  &:hover {
    background: ${darken(0.04, colors.primary)};
  }

  svg {
    margin-right: 5px;
  }

  span + svg {
    position: absolute;
    right: 10px;
  }

  ${(props) =>
    props.loading &&
    css`
      cursor: not-allowed;
      background: ${darken(0.04, colors.primary)};

      svg {
        margin: 0 5px 0 0;
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
