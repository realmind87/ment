import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openPostState } from '../reducers/slices/post';
import { userSelector } from '@/reducers/slices/user';
import { useRouter } from 'next/router';

const ToolList = ({ set }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const router = useRouter();

  const onOpenPost = useCallback(() => {
    if (!user) {
      alert('로그인 부탁드립니다.');
      router.replace('/intro');
      return true;
    }
    document.querySelector('#body').classList.add('hidden');
    dispatch(openPostState())
  }, []);
  const onSearch = useCallback(() => set('search'), []);

  return (
    <ul>
      <li><button type="button" className="btn__add" onClick={onOpenPost}>등록</button></li>
      <li><button type="button" className="btn__search" onClick={onSearch}>검색</button></li>
    </ul>
  );
};

export default ToolList;
