import React from 'react';
import PropTypes from 'prop-types';

const Test = ({ text }) => (
  <div>{`This is a test: ${text}`}</div>
);

Test.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Test;
