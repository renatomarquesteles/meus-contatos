import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowForward, MdEmail, MdLock } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/FormInput';
import { signInRequest } from '../../store/modules/auth/actions';
import { Content } from './styles';

export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  async function handleSubmit({ email, password }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string()
          .min(6, 'A senha deve conter pelo menos 6 caracteres')
          .required('A senha é obrigatória'),
      });

      await schema.validate({ email, password }, { abortEarly: false });

      formRef.current.setErrors({});

      dispatch(signInRequest(email, password));
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
      <img src={logo} alt="Meus Contatos" />
      <strong>Bem-vindo</strong>
      <span>Salve seus contatos e consulte onde e quando quiser!</span>
      <Form ref={formRef} onSubmit={handleSubmit}>
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
              <span>ENTRAR NO SISTEMA</span>
              <MdArrowForward size={22} color="#fff" />
            </>
          )}
        </Button>
      </Form>
      <p>
        <span>Não possui uma conta?</span>{' '}
        <Link to="/register">Cadastre-se</Link>
      </p>
    </Content>
  );
}
