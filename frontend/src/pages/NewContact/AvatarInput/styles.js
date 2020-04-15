import styled from 'styled-components';
import { darken, lighten } from 'polished';

import colors from '../../../styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

export const DefaultPreview = styled.label`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${colors.background};
  border: 1px dashed rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${darken(0.015, colors.background)};
  }
`;
