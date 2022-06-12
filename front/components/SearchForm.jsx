import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { librarySelector } from '@/reducers/slices/library';

const SearchForm = ({ set, device }) => {
  // state
  const [schVal, setSchVal] = useState('');
  const { deviceType } = useSelector(librarySelector);

  // onChange handler
  const onChangeSearch = useCallback(({ target }) => {
    setSchVal(target.value);
  }, []);

  // onSubmit handler
  const onSubmitSearch = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onBack = useCallback(() => set(null), []);
  
  return (
    <form onSubmit={onSubmitSearch}>
      <div className="search-area">
        { deviceType === "mobile" && 
          <button type="button" className="btn__close" onClick={onBack}>
            뒤로가기
          </button>
        }
        <div className="input-control">
          <input type="text" value={schVal} onChange={onChangeSearch} />
        </div>
        <button type="submit" className="btn__search">
          검색
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
