import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '@/reducers/actions/post';
import { librarySelector, getKeyword } from '@/reducers/slices/library';
import useApp from '@/hooks/useApp';

const SearchForm = ({ set }) => {

  const app = useApp();
  const dispatch = useDispatch();
  

  // state
  const [keyword, setKeyword] = useState('');

  // onChange handler
  const onChangeSearch = useCallback(({ target }) => setKeyword(target.value), []);

  // onSubmit handler
  const onSubmitSearch = useCallback((e) => {
    e.preventDefault();
    dispatch(getKeyword(keyword));
    dispatch(search(keyword));
  }, [keyword]);

  const onBack = useCallback(() => set(null), []);
  
  return (
    <form onSubmit={onSubmitSearch}>
      <div className="search-area">
        {app.device === "mobile" && <button type="button" className="btn__close" onClick={onBack}>뒤로가기</button>}
        <div className="input-control">
          <input type="text" value={keyword} onChange={onChangeSearch} />
        </div>
        <button type="submit" className="btn__search">검색</button>
      </div>
    </form>
  );
};

export default SearchForm;
