import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAccountCircle,
  MdArrowForward,
  MdEmail,
  MdLock,
} from 'react-icons/md';
import { FiLoader } from 'react-icons/fi';
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Content } from './styles';

export default function SignUp() {
  let [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  function setErrors() {
    formRef.current.setErrors({
      name: 'Nome é obrigatório',
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
      <strong>Realizar Cadastro</strong>
      <span>Salve seus contatos e consulte onde e quando quiser!</span>
      <Form ref={formRef} onSubmit={() => setErrors()}>
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
        <Button type="submit" loading={loading} disabled={loading}>
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
