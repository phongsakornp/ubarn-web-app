import React from 'react';

import LayoutContextProvider from './src/components/context/LayoutContextProvider';

export const wrapRootElement = ({ element }) => {
  return <LayoutContextProvider>{element}</LayoutContextProvider>;
};
