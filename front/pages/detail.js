import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { postsSelector } from '../reducers/slices/post';
import { loadDetail } from '../reducers/actions/post';
import { DetailLayout } from '../components';
import { useQuery } from '../hooks/useQuery';

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { detail, detailloading } = useSelector(postsSelector);
  const query = useQuery();

  const onCommendRouter = useCallback((id) => {
    router.push({
      pathname: '/comment',
      query: { id },
    });
  }, []);
  
  useEffect(() => {
    if (!query) return true;
    if (!query.postId) return true;
    dispatch(loadDetail(query.postId));
  }, [query]);

  if (detailloading) return <SkeletonDetail />;
  if (!detail) return null;

  return (
    <DetailLayout
      title={detail.title}
      postId={detail.id}
      userId={detail.UserId}
    >
      {detail.Images &&
        detail.Images.length > 0 &&
        detail.Images.map((img, index) => (
          <div key={index} className="visual">
            <img src={`http://localhost:3065/${img.src}`} />
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
};
export default Detail;

const SkeletonDetail = () => {
  return (
    <DetailLayout>
      <div className="visual skeleton" style={{ height: '24rem' }}></div>
      <section className="content">
        <p className="skeleton__text"></p>
        <p className="skeleton__text" style={{ marginTop: '1rem' }}></p>
        <p className="skeleton__text" style={{ marginTop: '1rem' }}></p>
        <p className="skeleton__text" style={{ marginTop: '1rem' }}></p>
      </section>
      <div className="commend-area">
        <div className="commend-area__info">
          <strong>댓글</strong>
        </div>
        <div className="commend-area__content">
          <p className="skeleton__text"></p>
        </div>
      </div>
    </DetailLayout>
  );
};
