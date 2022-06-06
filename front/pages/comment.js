import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommendLayout } from '../components';
import { postsSelector } from '../reducers/slices/post';
import { loadComment } from '../reducers/actions/post';
import { useQuery } from '../hooks/useQuery';

const skeletonCommend = (number) => {
  const _result = [];
  for (let i = 0; i < number; i++) {
    _result.push(<SkeletonCommend key={i} />);
  }
  return _result;
};

const Commend = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const { comment, commentLoading, addCommentLoading } =
    useSelector(postsSelector);

  useEffect(() => {
    if (!query) return true;
    if (!query.id) return true;
    dispatch(loadComment(query.id));
  }, [query]);

  if (commentLoading) {
    return (
      <CommendLayout id={query.id}>
        <ul>{skeletonCommend(10)}</ul>
      </CommendLayout>
    );
  }

  console.log(comment);

  if (!comment) return null;

  return (
    <CommendLayout id={query.id}>
      <ul>
        {comment.map((cb, index) => (
          <li key={index}>
            <div className="user-info">
              <div className="user-thum"></div>
              <span>{cb.User.userid}</span>
            </div>
            <p className="txt">{cb.content}</p>
          </li>
        ))}
        {addCommentLoading && skeletonCommend(1)}
      </ul>
    </CommendLayout>
  );
};

export default Commend;

const SkeletonCommend = () => {
  return (
    <li>
      <div className="user-info">
        <div className="user-thum skeleton"></div>
        <span
          className="skeleton__tit"
          style={{ width: '5rem', height: '1.6rem' }}
        ></span>
      </div>
      <p className="txt skeleton__text"></p>
      <p className="txt skeleton__text"></p>
      <p className="txt skeleton__text"></p>
    </li>
  );
};
