import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { wrapper } from '../../store';
import { postsSelector } from '../../reducers/slices/post';
import { DetailLayout } from '../../components';
import { loadDetail } from '../../reducers/actions/post';
import { userInfo } from '../../reducers/actions/auth';
import { librarySelector } from '../../reducers/slices/library';
import { userSelector } from '../../reducers/slices/user';
import { removePost } from '../../reducers/actions/post';
import backUrl from '../../config'

function Post() {
  const router = useRouter();
  const { detail, detailloading } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);
  const { deviceType } = useSelector(librarySelector);
  const currentUserId = user?.id;
  
  const onRemovePost = useCallback(() =>  dispatch(removePost(detail.id)), []);

  const onCommendRouter = useCallback((id) => {
    router.push({
      pathname: `/comment/${id}`,
    });
  }, []);

  if (detailloading) return <SkeletonDetail />;
  if (!detail) return null;
  
  console.log( deviceType );

  return (
    <DetailLayout
      detail={detail}
      title={detail.title}
      postId={detail.id}
      userId={detail.UserId}
      deviceType={deviceType}
      onRemovePost={onRemovePost}
    >
      {detail.Images &&
        detail.Images.length > 0 &&
        detail.Images.map((img, index) => (
          <div key={index} className="visual">
            <img src={`${backUrl}/${img.src}`} />
          </div>
        ))}
      <section className="content">
        <p>{detail.content}</p>
      </section>
      <div className="commend-area" onClick={() => onCommendRouter(detail.id)}>
        <div className="commend-area__info">
          <strong>댓글</strong>
          <span>{detail.Comments.length}</span>
        </div>
        <div className="commend-area__content">
          {detail.Comments.length !== 0 ? (
            <p>{detail.Comments[0].content}</p>
          ) : (
            <p>작성된 댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </DetailLayout>
  );
}

function SkeletonDetail() {
  return (
    <DetailLayout>

      <div className="visual skeleton" style={{ height: '24rem' }} />
      <section className="content">
        <p className="skeleton__text" />
        <p className="skeleton__text" style={{ marginTop: '1rem' }} />
        <p className="skeleton__text" style={{ marginTop: '1rem' }} />
        <p className="skeleton__text" style={{ marginTop: '1rem' }} />
      </section>
      <div className="commend-area">
        <div className="commend-area__info">
          <strong>댓글</strong>
        </div>
        <div className="commend-area__content">
          <p className="skeleton__text" />
        </div>
      </div>
    </DetailLayout>
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
    await store.dispatch(loadDetail(context.params.id));

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

export default Post;
