import React, { useRef, useEffect, useCallback, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { useField } from '@unform/core';

import { Container, DefaultPreview } from './styles';

export default function ImageInput({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [preview, setPreview] = useState(defaultValue);

  const handlePreview = useCallback((e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {preview ? (
        <label htmlFor="file">
          <img src={preview} alt="Preview" />
        </label>
      ) : (
        <DefaultPreview htmlFor="file">
          <MdPerson size={50} color="#999" />
        </DefaultPreview>
      )}
      <input
        id="file"
        type="file"
        ref={inputRef}
        onChange={handlePreview}
        {...rest}
      />
    </Container>
  );
}
