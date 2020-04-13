import React from 'react';

import backgroundImage from '../../../assets/personal_notebook.svg';
import { Container, Wrapper } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Container>
        <img src={backgroundImage} alt="Imagem de fundo" />
        {children}
      </Container>
    </Wrapper>
  );
}
