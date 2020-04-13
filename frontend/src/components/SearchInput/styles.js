import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 380px;
  height: 44px;
  padding: 0 10px;
  margin-right: 10px;
  background: ${colors.container};
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  input {
    width: 100%;
    color: ${colors.primaryText};
    font-size: 14px;
    background: none;
    border: 0;

    ::placeholder {
      color: ${colors.secondaryText};
    }
  }
`;
