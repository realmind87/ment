import { useCallback, useState } from 'react';
//import SearchForm from './SearchForm';
import NavMenu from './NavMenu';
import { useDispatch, useSelector } from 'react-redux';
import { openPostState } from '@/reducers/slices/post';
import { userSelector } from '@/reducers/slices/user';
import Link from 'next/link'

import backUrl from '../config'

const Header = ({ to = 'main' }) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState();
  const { user } = useSelector(userSelector);

  const imagePaths = user?.Images;

  const onNavigation = useCallback(() => {
    document.querySelector('#body').classList.add('hidden');
    setOpen(true);
  }, []);

  const onOpenPost = useCallback(() => {
    document.querySelector('#body').classList.add('hidden');
    dispatch(openPostState());
  }, []);
  
  return (
    <header className={`header ${to}`}>
      <div className='inner'>
        <h1 className="logo">ment</h1>
        {to === 'main' && (
          <div className='tnb'>
            {/* {deviceType === "desktop" && 
              <>
                  <div className="main-search">
                    <SearchForm />
                  </div>
              </>
            } */}

            {user 
              ? (
                <>
                <button type="button" className="btn__add" onClick={onOpenPost}>등록</button>
                  {imagePaths &&
                    imagePaths.length > 0 
                      ? (
                        imagePaths.map((img, index) => (
                          <div className='user-menu' key={index} onClick={onNavigation}>
                            <img src={`${backUrl}/${img.src}`} />
                          </div>
                        ))
                      ) : (
                        <div className='user-menu none' onClick={onNavigation}></div>
                      )
                  }
                </>
              )
              : (
                <Link href="/intro">
                  <a className="btn-login">로그인</a>
                </Link>
              )
            }
            
            <NavMenu isOpen={isOpen} set={setOpen} />
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
