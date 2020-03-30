const React = require('react');

const LayoutContextProvider = require('./src/components/context/LayoutContextProvider');

exports.wrapRootElement = ({ element }) => {
  return <LayoutContextProvider>{element}</LayoutContextProvider>;
};
