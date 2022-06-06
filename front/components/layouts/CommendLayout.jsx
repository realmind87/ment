import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addComment } from '../../reducers/actions/post';

const CommendLayout = ({ children, id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const postId = id;
  const [comment, setComment] = useState('');

  const onBackRouter = useCallback((id) => {
    router.back();
  }, []);

  const onChangeCommend = useCallback(({ target }) => {
    setComment(target.value);
  }, []);

  const onPutCommend = useCallback(
    () => dispatch(addComment({ content: comment, postId })),
    [comment],
  );

  return (
    <div className="commend-wrap">
      <header>
        <button
          type="button"
          className="btn__back"
          onClick={() => onBackRouter(id)}
        >
          뒤로가기
        </button>
        <strong>댓글</strong>
        <span></span>
      </header>

      <div className="commend-wrap__content">{children}</div>

      <div className="commend-wrap__form">
        <div className="input-control">
          <input type="text" value={comment} onChange={onChangeCommend} />
        </div>
        <button type="button" className="btn" onClick={onPutCommend}>
          등록
        </button>
      </div>
    </div>
  );
};

export default CommendLayout;
