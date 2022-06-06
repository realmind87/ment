import { useCallback, useState } from 'react';
//import SearchForm from './SearchForm';
import NavMenu from './NavMenu';
import { useDispatch, useSelector } from 'react-redux';
import { openPostState } from '../reducers/slices/post';
import { librarySelector } from '../reducers/slices/library';

const Header = ({ to = 'main' }) => {
  const dispatch = useDispatch();
  const { deviceType } = useSelector(librarySelector);
  const [isOpen, setOpen] = useState();

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
            <button type="button" className="btn__add" onClick={onOpenPost}>
              등록
            </button>
            <button type="button" className="btn-menu" onClick={onNavigation}>
              전체화면
            </button>
            <NavMenu isOpen={isOpen} set={setOpen} />
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
