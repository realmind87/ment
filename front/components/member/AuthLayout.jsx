import React, { useCallback } from 'react';
import { Portal } from '@/components/index';

const AuthLayout = ({ title, show, setShow, children }) => {
  const onClose = useCallback(() => setShow(false), []);

  return (
    <Portal to="modal">
      {show && (
        <div className="auth-wrap">
          <div className='auth-container'>
            <header>
              <h1>{title}</h1>
            </header>
            <div className="auth-wrap__content">{children}</div>
            <button type="button" className="auth-wrap__close" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default AuthLayout;
