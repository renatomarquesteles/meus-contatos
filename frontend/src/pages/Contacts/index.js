import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import Button from '../../components/Button';
import SearchInput from '../../components/SearchInput';
import { Contact, ContactList, ContactInfo, Content, Tools } from './styles';

export default function Contacts() {
  return (
    <Content>
      <h1>Lista de Contatos</h1>
      <Tools>
        <SearchInput name="search" placeholder="Buscar nome ou número..." />
        <Link to="/newContact">
          <Button type="button">
            <MdAdd size={22} color="#f5f5f5" />
            <span>NOVO CONTATO</span>
          </Button>
        </Link>
      </Tools>
      <ContactList>
        <Contact>
          <img
            src="https://api.adorable.io/avatars/50/contact.png"
            alt="Avatar"
          />
          <ContactInfo>
            <strong>Renato Marques</strong>
            <span>(16) 99292-1771</span>
          </ContactInfo>
        </Contact>
        <Contact>
          <img
            src="https://api.adorable.io/avatars/50/contact.png"
            alt="Avatar"
          />
          <ContactInfo>
            <strong>Renato Marques</strong>
            <span>(16) 99292-1771</span>
          </ContactInfo>
        </Contact>
        <Contact>
          <img
            src="https://api.adorable.io/avatars/50/contact.png"
            alt="Avatar"
          />
          <ContactInfo>
            <strong>Renato Marques</strong>
            <span>(16) 99292-1771</span>
          </ContactInfo>
        </Contact>
        <Contact>
          <img
            src="https://api.adorable.io/avatars/50/contact.png"
            alt="Avatar"
          />
          <ContactInfo>
            <strong>Renato Marques</strong>
            <span>(16) 99292-1771</span>
          </ContactInfo>
        </Contact>
      </ContactList>
    </Content>
  );
}
