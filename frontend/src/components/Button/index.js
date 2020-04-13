import React from 'react';

import { DefaultButton } from './styles';

export default function Button({ children, ...rest }) {
  return <DefaultButton {...rest}>{children}</DefaultButton>;
}
