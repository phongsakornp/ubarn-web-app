import React from 'react';
import PropTypes from 'prop-types';

const textColor = 'text-gray-800';

const H1 = ({ children, className }) => {
  return (
    <h1
      className={`mt-0 mb-2 text-6xl font-normal leading-normal ${textColor} ${className}`}
    >
      {children}
    </h1>
  );
};
H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
H1.defaultProps = {
  children: null,
  className: '',
};

const H2 = ({ children, className }) => {
  return (
    <h2
      className={`mt-0 mb-2 text-5xl font-normal leading-normal ${textColor} ${className}`}
    >
      {children}
    </h2>
  );
};
H2.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
H2.defaultProps = {
  children: null,
  className: '',
};

const H3 = ({ children, className }) => {
  return (
    <h3
      className={`text-4xl font-normal leading-normal mt-0 mb-2 ${textColor} ${className}`}
    >
      {children}
    </h3>
  );
};
H3.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
H3.defaultProps = {
  children: null,
  className: '',
};

const H4 = ({ children, className }) => {
  return (
    <h4
      class={`text-3xl font-normal leading-normal mt-0 mb-2 ${textColor} ${className}`}
    >
      {children}
    </h4>
  );
};
H4.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
H4.defaultProps = {
  children: null,
  className: '',
};

const H5 = ({ children, className }) => {
  return (
    <h5
      class={`text-2xl font-normal leading-normal mt-0 mb-2 ${textColor} ${className}`}
    >
      {children}
    </h5>
  );
};
H5.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
H5.defaultProps = {
  children: null,
  className: '',
};

const H6 = ({ children, className }) => {
  return (
    <h6
      class={`text-xl font-normal leading-normal mt-0 mb-2 ${textColor} ${className}`}
    >
      {children}
    </h6>
  );
};
H6.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
H6.defaultProps = {
  children: null,
  className: '',
};

export { H1, H2, H3, H4, H5 };
