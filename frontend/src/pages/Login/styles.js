import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Content = styled.div`
  position: absolute;
  background: ${colors.container};
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 22px;
  padding: 30px 45px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    height: 24px;
    margin: 5px 0;
  }

  > strong {
    font-size: 24px;
    font-weight: 500;
    margin: 15px 0;
  }

  > span {
    max-width: 250px;
    color: ${colors.secondaryText};
    text-align: center;
  }

  button {
    width: 100%;
    margin: 15px 0;
  }

  a {
    font-weight: 400;
    color: ${colors.primary};

    &:hover {
      text-decoration: underline;
      color: ${darken(0.04, colors.primary)};
    }
  }
`;
