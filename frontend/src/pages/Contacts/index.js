import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';

import Button from '../../components/Button';
import SearchInput from '../../components/SearchInput';
import useDebounce from '../../hooks/useDebounce';
import api from '../../services/api';
import {
  Contact,
  ContactList,
  ContactInfo,
  Content,
  Loader,
  Tools,
} from './styles';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function loadContacts() {
      const response = await api.get('contacts');

      setContacts(response.data);
    }

    loadContacts();
  }, []);

  useEffect(() => {
    searchContacts(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  async function searchContacts(searchText) {
    const response = await api.get('/contacts', {
      params: {
        name: searchText,
      },
    });

    setIsSearching(false);
    setContacts(response.data);
  }

  return (
    <Content>
      <h1>Lista de Contatos</h1>
      <Tools>
        <SearchInput
          name="search"
          placeholder="Buscar contato..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsSearching(true);
          }}
        />
        <Link to="/newContact">
          <Button type="button">
            <MdAdd size={22} color="#f5f5f5" />
            <span>NOVO CONTATO</span>
          </Button>
        </Link>
      </Tools>
      <Loader isLoading={isSearching}>
        <FiLoader size={30} color="#999" />
      </Loader>
      <ContactList>
        {contacts.length === 0 && <span>Nenhum contato encontrado.</span>}
        {contacts.map((contact) => (
          <Contact key={contact.id}>
            <img
              src={
                contact.avatar
                  ? contact.avatar.url
                  : `https://api.adorable.io/avatars/50/${contact.id}.png`
              }
              alt={`Avatar de ${contact.name}`}
            />
            <ContactInfo>
              <strong>{contact.name}</strong>
              {contact.phones[0] && (
                <span>{contact.phones[0].phone_number}</span>
              )}
              {contact.email && <span>{contact.email}</span>}
            </ContactInfo>
          </Contact>
        ))}
      </ContactList>
    </Content>
  );
}
