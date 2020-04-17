import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  padding-bottom: 100px;
  margin-top: 15px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 560px;
  background: ${colors.container};
  margin: 0 auto;
  padding: 20px 30px;
  border-radius: 10px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.primaryText};
  }

  > p {
    margin: 20px 0;
    color: ${colors.secondaryText};
  }

  button {
    width: 100%;
    margin: 10px 0;
  }

  form > p {
    margin-top: 15px;
    font-weight: bold;
    color: ${colors.primaryText};
  }
`;

export const AddRemoveButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    border: 0;
    width: fit-content;

    svg {
      margin: 0 3px;
      transition: fill 0.2s linear;
    }

    &:hover {
      svg {
        fill: ${colors.primary};
      }
    }

    &:first-child {
      svg:hover {
        fill: ${colors.error};
      }
    }
  }
`;

export const AddressContainer = styled.div`
  > label {
    font-weight: bold;
    color: ${colors.primaryText};
  }
`;

export const AddressInfo = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 0 10px 10px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 10px;

  > div:last-of-type {
    input {
      text-transform: uppercase;
    }
  }
`;

export const PhoneContainer = styled.div`
  display: flex;
  align-items: flex-end;

  > div {
    width: 100%;
  }

  button {
    background: none;
    border: 0;
    width: fit-content;

    svg {
      transition: fill 0.2s linear;
      margin: 0 5px;
    }

    &:hover {
      svg {
        fill: ${colors.error};
      }
    }
  }
`;
