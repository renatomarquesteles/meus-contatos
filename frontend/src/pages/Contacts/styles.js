import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  background: ${colors.container};
  margin: 15px auto 0;
  padding: 20px 30px;
  border-radius: 10px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.primaryText};
  }
`;

export const Tools = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 420px) {
    svg {
      margin-right: 0;
    }

    button span {
      display: none;
    }
  }
`;

export const ContactList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 50px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const Contact = styled.li`
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  &:hover {
    background: ${darken(0.03, colors.container)};
  }
`;

export const ContactInfo = styled.div`
  height: 50px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  span {
    color: ${colors.secondaryText};
  }
`;
