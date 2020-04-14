import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAccountCircle,
  MdAddCircleOutline,
  MdEmail,
  MdPersonAdd,
} from 'react-icons/md';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';

import Button from '../../components/Button';
import PhoneInput from '../../components/PhoneInput';
import Input from '../../components/FormInput';

import {
  AddButtonContainer,
  AddressContainer,
  AddressInfo,
  InputsWrapper,
  Container,
  Content,
} from './styles';

export default function NewContact() {
  const [phones, setPhones] = useState(['']);
  const [addresses, setAddresses] = useState(['']);
  const formRef = useRef(null);

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Container>
      <Content>
        <h1>Criar um novo contato</h1>
        <p>
          Insira os dados de um novo contato e o adicione à sua lista de
          contatos!
        </p>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Nome*"
            placeholder="John Doe"
            icon={MdAccountCircle}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            placeholder="exemplo@email.com"
            icon={MdEmail}
          />
          <p>Telefone/Celular</p>
          {phones.map((_, index) => (
            <PhoneInput key={index} name={`phones[${index}]`} />
          ))}
          <AddButtonContainer>
            <button type="button" onClick={() => setPhones([...phones, ''])}>
              <MdAddCircleOutline size={24} color="#444" />
            </button>
          </AddButtonContainer>
          <AddressContainer>
            <label>Endereço</label>
            {addresses.map((_, index) => (
              <AddressInfo key={index}>
                <Scope path={`addresses[${index}]`}>
                  <Input
                    name="zipcode"
                    label="CEP*"
                    mask="99999-999"
                    maskPlaceholder="_____-___"
                    placeholder="99999-999"
                  />
                  <InputsWrapper>
                    <Input
                      name="street"
                      label="Logradouro*"
                      placeholder="Rua São José"
                    />
                    <Input
                      name="number"
                      label="Número*"
                      mask="9999"
                      placeholder="9999"
                    />
                  </InputsWrapper>
                  <Input
                    name="complement"
                    label="Complemento"
                    placeholder="Informações adicionais"
                  />
                  <Input
                    name="neighborhood"
                    label="Bairro*"
                    placeholder="Centro"
                  />
                  <InputsWrapper>
                    <Input
                      name="city"
                      label="Cidade*"
                      placeholder="São Paulo"
                    />
                    <Input
                      name="state"
                      label="Estado*"
                      mask="aa"
                      maskPlaceholder="_"
                      placeholder="SP"
                    />
                  </InputsWrapper>
                </Scope>
              </AddressInfo>
            ))}
            <AddButtonContainer>
              <button
                type="button"
                onClick={() => setAddresses([...addresses, ''])}
              >
                <MdAddCircleOutline size={24} color="#444" />
              </button>
            </AddButtonContainer>
          </AddressContainer>
          <Button type="submit">
            <span>SALVAR CONTATO</span>
            <MdPersonAdd size={22} color="#fff" />
          </Button>
          <Link to="/contacts">
            <Button type="button" secondary>
              <span>CANCELAR</span>
            </Button>
          </Link>
        </Form>
      </Content>
    </Container>
  );
}
