import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForward, MdEmail, MdLock } from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { Form } from '@unform/web';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Content } from './styles';

export default function Login() {
  let [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  function setErrors() {
    formRef.current.setErrors({
      email: 'E-mail é obrigatório',
      password: 'Senha é obrigatória',
    });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <Content>
      <img src={logo} alt="Meus Contatos" />
      <strong>Bem-vindo</strong>
      <span>Salve seus contatos e consulte onde e quando quiser!</span>
      <Form ref={formRef} onSubmit={() => setErrors()}>
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
        <Button type="submit" loading={loading} disabled={loading}>
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
