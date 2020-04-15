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

export const Actions = styled.div`
  position: absolute;
  right: 0;
  opacity: 0;
  margin-right: 10px;

  svg {
    margin-right: 5px;
  }
`;

export const Contact = styled.li`
  padding: 10px;
  border-radius: 8px;
  position: relative;
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

    ${Actions} {
      opacity: 1;
    }
  }
`;

export const ContactInfo = styled.div`
  height: 50px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    color: ${colors.secondaryText};
    margin-top: 3px;
  }
`;

export const Loader = styled.div`
  width: 100%;
  height: 60px;
  display: none;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isLoading &&
    css`
      display: flex;

      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  h3 {
    font-weight: bold;
    margin: 10px 0;

    span {
      font-weight: 400;
      margin-right: 5px;
    }
  }
`;

export const Endereco = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 4px 12px;
  margin-bottom: 10px;
`;

export const Phones = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const EditButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  svg {
    margin-left: 5px;
  }

  a {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;

    span {
      color: ${colors.secondaryText};
    }

    &:hover {
      background: ${colors.background};
    }
  }
`;
