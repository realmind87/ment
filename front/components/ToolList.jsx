import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openPostState } from '../reducers/slices/post';

const ToolList = ({ set }) => {

  const dispatch = useDispatch();

  const onOpenPost = useCallback(() => {
    document.querySelector('#body').classList.add('hidden');
    dispatch(openPostState())
  }, []);
  const onSearch = useCallback(() => set('search'), []);

  return (
    <ul>
      <li>
        <button type="button" className="btn__add" onClick={onOpenPost}>
          등록
        </button>
      </li>
      <li>
        <button type="button" className="btn__search" onClick={onSearch}>
          검색
        </button>
      </li>
    </ul>
  );
};

export default ToolList;
