import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import { ErrorMessage, InputContainer, InputWrapper } from './styles';

export default function Input({ name, label, icon: Icon, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = '', registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer error={error}>
      <label htmlFor={name}>{label}</label>
      <InputWrapper>
        {Icon && <Icon size={20} color="#444" />}
        <input
          id={name}
          name={name}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </InputWrapper>
      <ErrorMessage>{error}</ErrorMessage>
    </InputContainer>
  );
}
