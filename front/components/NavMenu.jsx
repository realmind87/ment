import { useCallback, useEffect } from 'react';
import Portal from './Portal';
import { useDispatch, useSelector } from 'react-redux';
import {
  userSelector,
  clearLoginState,
  clearUserState,
} from '../reducers/slices/user';
import { loginout } from '../reducers/actions/auth';
import { useRouter } from 'next/router';

const NavMenu = ({ isOpen, set }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(userSelector);

  const onLogout = useCallback(() => {
    dispatch(loginout());
  }, []);

  const onClose = useCallback(() => {
    document.querySelector('#body').classList.remove('hidden');
    set(false);
  }, []);

  // 로그아웃
  useEffect(() => {
    if (!user) {
      onClose();
      router.replace('/intro');
    }
  }, [user]);

  return (
    <Portal>
      {isOpen && (
        <div className="menu">
          <div className="menu__wrap">
            <nav className="menu__list">
              <ul>
                {/* <li>
                  <button type="button" className="menu__list__btn">
                    내 정보
                  </button>
                </li>
                <li>
                  <button type="button" className="menu__list__btn">
                    내 게시글
                  </button>
                </li> */}
                <li>
                  <button
                    type="button"
                    className="menu__list__btn"
                    onClick={onLogout}
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <button
            type="button"
            className="btn__back right"
            onClick={onClose}
          ></button>
        </div>
      )}
    </Portal>
  );
};

export default NavMenu;
