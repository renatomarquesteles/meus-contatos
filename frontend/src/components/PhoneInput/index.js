import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { useField } from '@unform/core';

import { ErrorMessage, InputContainer, InputWrapper } from './styles';

export default function PhoneInput({ name, label, ...rest }) {
  const [mask, setMask] = useState({
    mask: '(99) 99999-9999',
    placeholder: '(__) _____-____',
  });
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  async function handlePhoneMask(e) {
    if (e.target.value === 'celular') {
      setMask({
        mask: '(99) 99999-9999',
        placeholder: '(__) _____-____',
      });
    } else {
      setMask({
        mask: '(99) 9999-9999',
        placeholder: '(__) ____-____',
      });
    }
  }

  return (
    <InputContainer error={error}>
      <label htmlFor={name}>{label}</label>
      <InputWrapper>
        <select onChange={(e) => handlePhoneMask(e)}>
          <option value="celular">Celular</option>
          <option value="telefone">Telefone</option>
        </select>
        <InputMask
          mask={mask.mask}
          maskPlaceholder={mask.placeholder}
          id={name}
          name={name}
          placeholder={mask.mask}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </InputWrapper>
      <ErrorMessage>{error}</ErrorMessage>
    </InputContainer>
  );
}
