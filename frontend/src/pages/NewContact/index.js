import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MdAccountCircle,
  MdAddCircleOutline,
  MdEmail,
  MdPersonAdd,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import AvatarInput from './AvatarInput';
import Button from '../../components/Button';
import PhoneInput from '../../components/PhoneInput';
import Input from '../../components/FormInput';
import api from '../../services/api';
import history from '../../services/history';

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
  const [avatar, setAvatar] = useState(null);
  const formRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getContact(id);
    }
  }, [id]);

  async function getContact(id) {
    try {
      const response = await api.get(`contact/${id}`);

      const { avatar, phones, addresses } = response.data;

      if (addresses.length === 0) {
        setAddresses(['']);
      } else {
        setAddresses(addresses);
      }
      setAvatar(avatar);

      const formattedPhones = [];
      await phones.forEach((phone, index) => {
        formattedPhones[index] = phone.phone_number;
      });
      setPhones(formattedPhones);

      setTimeout(() => {
        formRef.current.setData(response.data);

        phones.map((phone, index) =>
          formRef.current.setFieldValue(`phones[${index}]`, phone.phone_number)
        );
      }, 500);
    } catch (err) {
      toast.error('Dados do contato não encontrados');
    }
  }

  async function handleSubmit(data) {
    let avatar_id = null;

    if (data.avatar) {
      const fileData = new FormData();

      fileData.append('file', data.avatar);

      const response = await api.post('files', fileData);

      avatar_id = response.data.id;
    }

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('Digite um e-mail válido'),
        phones: Yup.array().of(
          Yup.string()
            .matches(
              /\(\d{2}\) (\d{5}|\d{4})-\d{4}/,
              'Digite corretamente o DDD e o número'
            )
            .required('O número de telefone/celular é obrigatório')
        ),
        addresses: Yup.array().of(
          Yup.object().shape({
            zipcode: Yup.string(),
            city: Yup.string().when('zipcode', (zipcode, field) =>
              zipcode ? field.required('A cidade é obrigatória') : field
            ),
            state: Yup.string()
              .max(2, 'O estado deve conter 2 caracteres')
              .when('zipcode', (zipcode, field) =>
                zipcode ? field.required('O estado é obrigatório') : field
              ),
            neighborhood: Yup.string().when('zipcode', (zipcode, field) =>
              zipcode ? field.required('O bairro é obrigatório') : field
            ),
            street: Yup.string().when('zipcode', (zipcode, field) =>
              zipcode ? field.required('O logradouro é obrigatório') : field
            ),
            number: Yup.string().when('zipcode', (zipcode, field) =>
              zipcode ? field.required('O número é obrigatório') : field
            ),
            complement: Yup.string(),
          })
        ),
        avatar_id: Yup.number(),
      });

      await schema.validate(data, { abortEarly: false });

      formRef.current.setErrors({});

      const { name, email, phones, addresses } = data;

      const dataToSend = { name };

      if (addresses[0].zipcode) {
        dataToSend['addresses'] = addresses;
      }

      if (phones) {
        dataToSend['phones'] = phones;
      }

      if (email) {
        dataToSend['email'] = email;
      }

      if (avatar_id) {
        dataToSend['avatar_id'] = avatar_id;
      }

      if (id) {
        await api.put(`contacts/${id}`, dataToSend);
      } else {
        await api.post('contacts', dataToSend);
      }

      toast.success('Contato salvo com sucesso!');
      history.push('/contacts');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      } else {
        toast.error('Erro! Verifique seus dados');
      }
    }
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
          <AvatarInput name="avatar" initialData={avatar} />
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
          <p>Telefone/Celular*</p>
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
                    label="CEP"
                    mask="99999-999"
                    maskPlaceholder="_____-___"
                    placeholder="99999-999"
                  />
                  <InputsWrapper>
                    <Input
                      name="street"
                      label="Logradouro"
                      placeholder="Rua São José"
                    />
                    <Input
                      name="number"
                      label="Número"
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
                    label="Bairro"
                    placeholder="Centro"
                  />
                  <InputsWrapper>
                    <Input name="city" label="Cidade" placeholder="São Paulo" />
                    <Input
                      name="state"
                      label="Estado"
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
