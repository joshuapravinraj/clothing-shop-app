import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ inverted, children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button ${inverted ? 'inverted' : ''}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;