import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAccountCircle,
  MdAddCircleOutline,
  MdEmail,
  MdPersonAdd,
} from 'react-icons/md';
import { Form } from '@unform/web';

import Button from '../../components/Button';
import PhoneInput from '../../components/PhoneInput';
import Input from '../../components/FormInput';

import {
  AddButtonContainer,
  AddressContainer,
  AddressInfo,
  CityStateWrapper,
  Container,
  Content,
} from './styles';

export default function NewContact() {
  const formRef = useRef(null);

  return (
    <Container>
      <Content>
        <h1>Criar um novo contato</h1>
        <p>
          Insira os dados de um novo contato e o adicione à sua lista de
          contatos!
        </p>
        <Form ref={formRef} onSubmit={() => {}}>
          <Input
            name="name"
            label="Nome"
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
          <PhoneInput name="phone" label="Telefone/Celular" />
          <AddButtonContainer>
            <button type="button">
              <MdAddCircleOutline size={24} color="#444" />
            </button>
          </AddButtonContainer>
          <AddressContainer>
            <label>Endereço</label>
            <AddressInfo>
              <Input
                name="zipcode"
                label="CEP"
                mask="99999-999"
                maskPlaceholder="_____-___"
                placeholder="99999-999"
              />
              <Input
                name="street"
                label="Logradouro"
                placeholder="Rua São José"
              />
              <Input
                name="complement"
                label="Complemento"
                placeholder="Informações adicionais"
              />
              <Input name="neighborhood" label="Bairro" placeholder="Centro" />
              <CityStateWrapper>
                <Input name="city" label="Cidade" placeholder="São Paulo" />
                <Input
                  name="state"
                  label="Estado"
                  mask="aa"
                  maskPlaceholder="_"
                  placeholder="SP"
                />
              </CityStateWrapper>
            </AddressInfo>
            <AddButtonContainer>
              <button type="button">
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
