import React from 'react';
import moment from 'moment';
import thLocale from 'moment/locale/th';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './src/styles/global.css';

import LayoutContextProvider from './src/components/context/LayoutContextProvider';

moment.updateLocale('th', thLocale);

export const wrapRootElement = ({ element }) => {
  return <LayoutContextProvider>{element}</LayoutContextProvider>;
};
