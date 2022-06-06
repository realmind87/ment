import React from 'react';
import Portal from './Portal';

const Modal = ({ children, open }) => {
  return <Portal to="modal">{children}</Portal>;
};

export default Modal;
