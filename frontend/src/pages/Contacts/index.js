import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdEdit, MdRemoveRedEye } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import SearchInput from '../../components/SearchInput';
import useDebounce from '../../hooks/useDebounce';
import api from '../../services/api';
import {
  Actions,
  Contact,
  ContactList,
  ContactInfo,
  Content,
  EditButton,
  Endereco,
  Loader,
  ModalInfo,
  Phones,
  Tools,
} from './styles';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

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

  function handleOpenModal(contact) {
    setModalOpen(true);
    setModalInfo(contact);
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
          <Contact key={contact.id} onClick={() => handleOpenModal(contact)}>
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
            <Actions>
              <MdRemoveRedEye size={24} color="#00b0ff" />
            </Actions>
          </Contact>
        ))}
      </ContactList>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalOpen(false)}
        modalWidth={360}
        modalHeight={400}
      >
        <ModalInfo>
          {modalInfo.avatar && (
            <img src={modalInfo.avatar.url} alt="Avatar do Contato" />
          )}
          <EditButton>
            <Link to={`/contacts/${modalInfo.id}`}>
              <span>Editar</span>
              <MdEdit size={16} color="#999" />
            </Link>
          </EditButton>
          <div>
            <h3>
              Nome: <span>{modalInfo.name}</span>
            </h3>
            {modalInfo.email && (
              <h3>
                E-mail: <span>{modalInfo.email}</span>
              </h3>
            )}
            {modalInfo.phones && (
              <>
                <h3>Telefone/Celular:</h3>
                <Phones>
                  {modalInfo.phones &&
                    modalInfo.phones.map((phone) => (
                      <p key={phone.phone_number}>{phone.phone_number}</p>
                    ))}
                </Phones>
              </>
            )}
            {modalInfo.addresses && (
              <>
                <h3>Endereço:</h3>
                {modalInfo.addresses.map((address) => (
                  <Endereco key={address.zipcode}>
                    <h3>
                      CEP: <span>{address.zipcode}</span>
                    </h3>
                    <h3>
                      Logradouro: <span>{address.street}</span>
                    </h3>
                    <h3>
                      Número: <span>{address.number}</span>
                    </h3>
                    {address.complement && (
                      <h3>
                        Complemento: <span>{address.complement}</span>
                      </h3>
                    )}
                    <h3>
                      Bairro: <span>{address.neighborhood}</span>
                    </h3>
                    <h3>
                      Cidade: <span>{address.city}</span>
                    </h3>
                    <h3>
                      Estado: <span>{address.state}</span>
                    </h3>
                  </Endereco>
                ))}
              </>
            )}
          </div>
        </ModalInfo>
      </Modal>
    </Content>
  );
}
