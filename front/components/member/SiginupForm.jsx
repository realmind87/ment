import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login, uploadImages, imageRemove } from '@/reducers/actions/auth';
import { userSelector } from '@/reducers/slices/user';
import { loading } from '@/reducers/slices/library';
import { useRouter } from 'next/router';
import backUrl from '../../config'

import validation from '@/hooks/validation';

const SiginupForm = () => {
  const dispatch = useDispatch();
  const {signupLoading, signupDone, signupError, loginLoading, user, imagePaths } = useSelector(userSelector);
  const router = useRouter();

  const [step, setStep] = useState('user');
  const [stepIndex, setStepIndex] = useState(1);
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [errUserId, setErrUserId] = useState(false);
  const [errNickname, setErrNickname] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [errPasswordCheck, setErrPasswordCheck] = useState(false);

  const [errUserMsg, setErrUserMsg] = useState('아이디');
  const [errNicknameMsg, setErrNicknameMsg] = useState('닉네임');
  const [errEmailMsg, setErrEmailMsg] = useState('이메일');
  const [errPasswordMsg, setErrPasswordMsg] = useState('비밀번호');
  const [errPasswordCheckMsg, setErrPasswordCheckMsg] =
    useState('비밀번호 확인');

  // 아이디 입력
  const onChangeUserId = useCallback(({ target }) => {
    setErrUserId(false);
    if (target.value <= 0) setErrUserMsg('아이디');
    setUserId(target.value);
  }, []);

  // 닉네임 입력
  const onChangeNickname = useCallback(({ target }) => {
    setErrNickname(false);
    if (target.value <= 0) setErrNicknameMsg('닉네임');
    setNickname(target.value);
  }, []);

  // 이메일 입력
  const onChangeUserEmail = useCallback(({ target }) => {
    setErrEmail(false);
    if (target.value <= 0) setErrEmailMsg('이메일');
    setUserEmail(target.value);
  }, []);

  // 비밀번호 입력
  const onChangePassword = useCallback(({ target }) => {
    setErrPassword(false);
    if (target.value <= 0) setErrPasswordMsg('비밀번호');
    setPassword(target.value);
  }, []);

  // 비밀번호 확인 입력
  const onChangePasswordCheck = useCallback(({ target }) => {
    setErrPasswordCheck(false);
    if (target.value <= 0) setErrPasswordCheckMsg('비밀번호 확인');
    setPasswordCheck(target.value);
  }, []);

  // 기본 유효성 검사
  const onUserValidation = useCallback((userId, userEmail) => {

    const userIdRegExp = /^[a-zA-Z0-9]{6,12}$/;
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

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
        !userIdRegExp.test(userId),
        setUserId,
        setErrUserId,
        setErrUserMsg,
        '아이디는 영문/숫자 포함 6~16자 이내로 입력해주세요.',
      )
    )
      return false;

      if (
        validation(
          !regEmail.test(userEmail),
          setUserEmail,
          setErrEmail,
          setErrEmailMsg,
          '올바른 이메일을 입력해주세요.',
        )
      )
        return false;

    if (
      validation(
        userEmail.length <= 0,
        setUserEmail,
        setErrEmail,
        setErrEmailMsg,
        '이메일을 입력해 주세요.',
      )
    )
      return false;

    return true;
  }, []);

  // 비밀번호 유효성 검사
  const onPasswordValidation = useCallback((password, passwordCheck) => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,16}$/;

    if (
      validation(
        password.length <= 0,
        setPassword,
        setErrPassword,
        setErrPasswordMsg,
        '비밀번호를 입력해 주세요',
      )
    )
      return false;
    if (
      validation(
        !passwordRegExp.test(password),
        setPassword,
        setErrPassword,
        setErrPasswordMsg,
        '비밀번호 조건을 다시한번 확인해주세요.',
      )
    )
      return false;
    if (
      validation(
        passwordCheck.length <= 0,
        setPasswordCheck,
        setErrPasswordCheck,
        setErrPasswordCheckMsg,
        '비밀번호 확인을 입력해 주세요',
      )
    )
      return false;
    if (
      validation(
        password !== passwordCheck,
        setPasswordCheck,
        setErrPasswordCheck,
        setErrPasswordCheckMsg,
        '비밀번호가 일치하지 않습니다.',
      )
    )
      return false;

    return true;
  }, []);

  // 프로필 유효성 검사
  const onProfileValidation = useCallback((nickname)=>{
    console.log(nickname.length)
    if (
      validation(
        nickname.length <= 0,
        setNickname,
        setErrNickname,
        setErrNicknameMsg,
        '닉네임을 입력해 주세요',
      )
    )
      return false;

    return true;
  }, [])

  // 이전 버튼
  const onPrev = useCallback(() => {
    if (step === "password") setStep('user')
    if (step === "profile") setStep('password'); 

    setStepIndex(prevState => prevState + -1);
    
  }, [userId, password, passwordCheck, userEmail, step]);

  // 다음 버튼
  const onNext = useCallback(() => {
    if (step === "user") {
      if (!onUserValidation(userId, userEmail)) return true;
      console.log('user');
      setStep('password');
    }

    if (step === "password") {
      if (!onPasswordValidation(password, passwordCheck)) return true;
      console.log('password');
      setStep('profile'); 
    }

    setStepIndex(prevState => prevState + 1);
    
  }, [userId, password, passwordCheck, userEmail, step]);

  const onImageChange = useCallback((e) => {
    e.preventDefault();
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch(uploadImages(imageFormData));
  }, []);

  const onImageRemove = useCallback(
    (index) => dispatch(imageRemove(index)),
    [],
  );

  // 회원 가입 버튼
  const onSignup = useCallback((e) => {
    e.preventDefault();
    if (!onProfileValidation(nickname)) return true;

    const userid = userId;
    const email = userEmail;

    const formData = new FormData();
    imagePaths.forEach((img) => {
      formData.append('image', img);
    });
    formData.append('userid', userId);
    formData.append('nickname', nickname);
    formData.append('email', email);
    formData.append('password', password);

    // FormData의 key 확인
    for (let key of formData.keys()) {
      console.log(`key: ${key}`);
    }

    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(`value: ${value}`);
    }

    //dispatch(register({ userid, nickname, email, password }));
    dispatch(register(formData));

  }, [userId, userEmail, password, nickname]);

  // 회원가입 성공시
  useEffect(() => {
    if (signupDone) {
      dispatch(login({ userid: userId, password }));
    } 
  }, [signupDone]);
  
  useEffect(()=>{
    dispatch(loading(signupLoading))
  }, [signupLoading])

  useEffect(()=>{
    dispatch(loading(loginLoading))
  }, [loginLoading])

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  // 회원가입 오류시
  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  return (
    <div className="membership">
      <p className='sign-step'>3단계 중 {stepIndex}단계</p>
      <form encType="multipart/form-data" onSubmit={onSignup}>
        {step === 'user' && (
          <>
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
                type="email"
                className={errEmail ? 'err' : ''}
                placeholder={errEmailMsg}
                value={userEmail}
                onChange={onChangeUserEmail}
              />
            </div>

            <div className="btn-area">
              <button type="button" className="btn" onClick={onNext}>
                다음
              </button>
            </div>
          </>
        )}
        {step === 'password' && (
          <>
            <div className="input-control">
              <input
                type="password"
                className={errPassword ? 'err' : ''}
                placeholder={errPasswordMsg}
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                className={errPasswordCheck ? 'err' : ''}
                placeholder={errPasswordCheckMsg}
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </div>
            <div className="btn-area">
              <button type="button" className="btn__gray" onClick={onPrev}>이전</button>
              <button type="button" className="btn" onClick={onNext}>다음</button>
            </div>
          </>
        )}
        {step === 'profile' && (
          <>
            <div className='profile-img'>
              <div className="img-wrap">
                <div className="img-content">
                  {imagePaths &&
                    imagePaths.map((img, index) => (
                      <div key={index} className="img-pre-view">
                        <div className="img-area">
                          <img src={`${backUrl}/${img}`} />
                        </div>
                        <button
                          type="button"
                          className="btn-del"
                          onClick={() => onImageRemove(index)}
                        >
                          삭제
                        </button>
                      </div>
                    ))}

                  {imagePaths && imagePaths.length === 0 && (
                    <>
                      <label
                        className="img-area"
                        htmlFor="img-input"
                      ></label>
                      <input
                        accept="image/*"
                        type="file"
                        id="img-input"
                        name="image"
                        multiple
                        onChange={onImageChange}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="input-control">
              <input
                type="text"
                className={errNickname ? 'err' : ''}
                placeholder={errNicknameMsg}
                value={nickname}
                onChange={onChangeNickname}
              />
            </div>
            
            <div className="btn-area">
              <button type="button" className="btn__gray" onClick={onPrev}>이전</button>
              <button type="submit" className="btn">등록</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default SiginupForm;
