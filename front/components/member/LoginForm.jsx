import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/actions/auth';
import { userSelector } from '../../reducers/slices/user';
import { loading } from '../../reducers/slices/library';
import { useRouter } from 'next/router';

import validation from '../../hooks/validation';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginError, loginLoading, user } = useSelector(userSelector);
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [errUserId, setErrUserId] = useState(false);
  const [errPassword, setErrPassword] = useState(false);

  const [errUserMsg, setErrUserMsg] = useState('아이디');
  const [errPasswordMsg, setErrPasswordMsg] = useState('비밀번호');

  // 기본 유효성 검사
  const onValidation = useCallback((userId, password) => {
    if (
      validation(
        userId.length <= 0,
        setUserId,
        setErrUserId,
        setErrUserMsg,
        '아이디를 입력해 주세요.',
      )
    )
      return false;
    if (
      validation(
        password.length <= 0,
        setPassword,
        setErrPassword,
        setErrPasswordMsg,
        '비밀번호를 입력해 주세요.',
      )
    )
      return false;
    return true;
  }, []);

  // 아이디 입력
  const onChangeUserId = useCallback(({ target }) => {
    setErrUserId(false);
    if (target.value <= 0) setErrUserMsg('아이디');
    setUserId(target.value);
  }, []);

  // 비밀번호 입력
  const onChangePassword = useCallback(({ target }) => {
    setErrPassword(false);
    if (target.value <= 0) setErrPasswordMsg('비밀번호');
    setPassword(target.value);
  }, []);

  const onLogin = useCallback(() => {
    if (!onValidation(userId, password)) return true;
    dispatch(login({ userid: userId, password }));
  }, [userId, password]);

  // 로그인
  useEffect(()=>{
    dispatch(loading(loginLoading))
  }, [loginLoading])

  // 로그인 성공시
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  // 로그인 에러
  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]); 

  return (
    <div className="membership">
      <div className="input-control">
        <input
          type="text"
          className={errUserId ? 'err' : ''}
          placeholder={errUserMsg}
          value={userId}
          onChange={onChangeUserId}
        />
      </div>
      <div className="input-control">
        <input
          type="password"
          className={errPassword ? 'err' : ''}
          placeholder={errPasswordMsg}
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="btn-area">
        <button type="button" className="btn" onClick={onLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
