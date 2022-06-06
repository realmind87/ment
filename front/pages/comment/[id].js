import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { wrapper } from '../../store';
import { CommendLayout } from '../../components';
import { postsSelector } from '../../reducers/slices/post';
import { loadComment } from '../../reducers/actions/post';
import { userInfo } from '../../reducers/actions/auth';

const skeletonCommend = (number) => {
  const _result = [];
  for (let i = 0; i < number; i++) {
    _result.push(<SkeletonCommend key={i} />);
  }
  return _result;
};

function Commend() {
  const router = useRouter();
  const { id } = router.query;
  const { comment, commentLoading, addCommentLoading } =
    useSelector(postsSelector);

  if (commentLoading) {
    return (
      <CommendLayout id={id}>
        <ul>{skeletonCommend(10)}</ul>
      </CommendLayout>
    );
  }

  if (!comment) return null;

  return (
    <CommendLayout id={id}>
      <ul>
        {comment.map((cb, index) => (
          <li key={index}>
            <div className="user-info">
              <div className="user-thum" />
              <span>{cb.User.userid}</span>
            </div>
            <p className="txt">{cb.content}</p>
          </li>
        ))}
        {addCommentLoading && skeletonCommend(1)}
      </ul>
    </CommendLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(userInfo());
    await store.dispatch(loadComment(context.params.id));

    const { user } = store.getState().user;

    if (!user) {
      return {
        redirect: {
          destination: '/intro',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
);

export default Commend;

function SkeletonCommend() {
  return (
    <li>
      <div className="user-info">
        <div className="user-thum skeleton" />
        <span
          className="skeleton__tit"
          style={{ width: '5rem', height: '1.6rem' }}
        />
      </div>
      <p className="txt skeleton__text" />
      <p className="txt skeleton__text" />
      <p className="txt skeleton__text" />
    </li>
  );
}
