import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import CommendForm from './CommendForm'

const CommendLayout = ({ children, id }) => {
  const router = useRouter();

  const onBackRouter = useCallback((id) => {
    router.back();
  }, []);

  return (
    <div className="commend-wrap">
      <header>
        <button
          type="button"
          className="btn__back"
          onClick={() => onBackRouter(id)}
        >
          뒤로가기
        </button>
        <strong>댓글</strong>
        <span></span>
      </header>
      
      <div className="commend-wrap__content">{children}</div>

      <CommendForm id={id} />

    </div>
  );
};

export default CommendLayout;
