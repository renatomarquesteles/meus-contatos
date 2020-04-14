import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdAccountCircle,
  MdArrowForward,
  MdEmail,
  MdLock,
} from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/FormInput';
import { signUpRequest } from '../../store/modules/auth/actions';
import { Content } from './styles';

export default function SignUp() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit({ name, email, password }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6, 'A senha deve conter pelo menos 6 caracteres')
          .required('A senha é obrigatória'),
      });

      await schema.validate({ name, email, password }, { abortEarly: false });

      formRef.current.setErrors({});

      dispatch(signUpRequest(name, email, password));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Content>
      <strong>Realizar Cadastro</strong>
      <span>Salve seus contatos e consulte onde e quando quiser!</span>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="name"
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
        <Input
          name="password"
          type="password"
          label="Senha"
          placeholder="********"
          icon={MdLock}
        />
        <Button type="submit" isLoading={loading} disabled={loading}>
          {loading ? (
            <>
              <FiLoader size={20} color="#fff" />
              Carregando...
            </>
          ) : (
            <>
              <span>CRIAR CONTA</span>
              <MdArrowForward size={22} color="#fff" />
            </>
          )}
        </Button>
      </Form>
      <p>
        <span>Já possui uma conta?</span>
        <Link to="/">Entrar</Link>
      </p>
    </Content>
  );
}
