import React from 'react';

import { DefaultButton, SecondaryButton } from './styles';

export default function Button({ children, secondary, ...rest }) {
  return (
    <>
      {secondary ? (
        <SecondaryButton {...rest}>{children}</SecondaryButton>
      ) : (
        <DefaultButton {...rest}>{children}</DefaultButton>
      )}
    </>
  );
}
