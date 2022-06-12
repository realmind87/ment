import React, { useState, useCallback } from 'react';
import { IntroLayout, Registration } from '../components';
import { wrapper } from '../store';
import axios from 'axios';

const Intro = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [to, setTo] = useState('');

  const loginLayer = useCallback(() => {
    setTo('login');
    setTitle('로그인');
    setOpen(true);
  }, []);

  const signupLayer = useCallback(() => {
    setTo('signup');
    setTitle('회원가입');
    setOpen(true);
  }, []);

  return (
    <>
      <IntroLayout>
        <div className="intro-area__box">
          <p>
            계정이 없으면
            <br />
            오늘 가입해주세요
          </p>
          <button type="button" className="btn" onClick={signupLayer}>
            가입
          </button>
        </div>

        <div className="intro-area__box">
          <p>
            이미 가입하셨나요?
          </p>
          <button type="button" className="btn" onClick={loginLayer}>
            로그인
          </button>
        </div>
      </IntroLayout>

      <Registration to={to} title={title} show={open} setShow={setOpen} />
    </>
  );
};


export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    // const { user } = store.getState().user;

    // if (user) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     },
    //   };
    // }

    return {
      props: {},
    };
  },
);

export default Intro;
