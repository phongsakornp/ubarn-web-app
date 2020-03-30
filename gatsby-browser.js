import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './src/styles/global.css';

import LayoutContextProvider from './src/components/context/LayoutContextProvider';

export const wrapRootElement = ({ element }) => {
  return <LayoutContextProvider>{element}</LayoutContextProvider>;
};
