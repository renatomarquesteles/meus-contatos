import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';

import logo from '../../assets/logo-white.png';
import { Container, Content, Divider, ListItem, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Meus Contatos" />
        <Divider />
        <nav>
          <MdMenu size={26} color="#f5f5f5" />
          <ul>
            <ListItem>
              <NavLink to="/contacts">LISTA</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/contacts/new">NOVO CONTATO</NavLink>
            </ListItem>
          </ul>
        </nav>
        <Profile>
          <span>Olá, Renato</span>
          <button type="button">Sair do sistema</button>
        </Profile>
      </Content>
    </Container>
  );
}
