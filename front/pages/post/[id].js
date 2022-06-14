import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { wrapper } from '../../store';
import { postsSelector } from '@/reducers/slices/post';
import { DetailLayout } from '@/components/index';
import { loadDetail, likePost, unLikePost, removePost, loadComment } from '@/reducers/actions/post';
import { userInfo } from '@/reducers/actions/auth';
import { userSelector } from '@/reducers/slices/user';
import CommendForm from '@/components/layouts/CommendForm'
import useApp from '@/hooks/useApp'
import backUrl from '../../config'

function Post() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { detail, detailloading, comments } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);
  const currentUserId = user?.id;
  const like = detail.Likers.find(v => v.id === currentUserId);
  const [ liked, setliked ] = useState(like ? true : false);

  console.log(comments)

  const app = useApp();
  const onRemovePost = useCallback(() =>  dispatch(removePost(detail.id)), []);
  const onCommendRouter = useCallback((id) => {
    router.push({
      pathname: `/comment/${id}`,
    });
  }, []);

  const onHashTagLoad = useCallback((hashtag)=>{
    // const {} = hashtag;
    // dispatch()
  }, [])

  const onLike = useCallback(async (id)=>{
    if (!user) {
      alert("로그인 부탁드립니다.");
      router.push({pathname: '/intro'});
      return true;
    }
    dispatch(likePost(id))
    setliked(true);
  }, []);

  const onUnLike = useCallback((id)=>{
    if (!user) {
      alert("로그인 부탁드립니다.");
      router.push({pathname: '/intro'});
      return true;
    }
    dispatch(unLikePost(id))
    setliked(false);
  }, [])
  
  if (detailloading) return <SkeletonDetail />;
  if (!detail) return null;
    
  return (
    <DetailLayout
      detail={detail}
      postId={detail.id}
      userId={detail.UserId}
      onRemovePost={onRemovePost}
    >
      {/* {detail.Images &&
        detail.Images.length > 0 &&
        detail.Images.map((img, index) => (
          <div key={index} className="visual">
            <img src={`${backUrl}/${img.src}`} />
          </div>
      ))} */}

      <section className="content">
        <div className='content__header'>
          <h1>{detail.title}</h1>

          <div className='post-info'>
            <div className='small-thumnail'><img src={`${backUrl}/${detail.User.Images[0].src}`} /></div>
            <p className='txt-nickname'>{detail.User.nickname}</p>
            <span className='txt-date'>{(()=>{
              const date = new Date(detail.createdAt);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              return `${year}년 ${month}월 ${day}일`
            })()}</span>

            {liked 
              ? <button className='btn__like on' type="button" onClick={() => onUnLike(detail.id)}>좋아요 취소</button>
              : <button className='btn__like' type="button" onClick={() => onLike(detail.id)}>좋아요</button>
            }
            
          </div>
          
        </div>
        <div className='content__area' dangerouslySetInnerHTML={{__html: detail.content}}></div>
        
        <div className='hash-tags'>
          {
            detail.Hashtags.length > 0 && (
              <ul>
                {detail.Hashtags.map((hashtag, index) => <li key={index} onClick={() => onHashTagLoad(hashtag)}>#{hashtag.name}</li>)}
              </ul>
            )
          }
        </div>
      </section>
        
      {
        app.device &&
          app.device === "mobile"
            ? (
              <div className="commend-area" onClick={() => onCommendRouter(detail.id)}>
                <div className="commend-area__info">
                  <strong>댓글</strong>
                  <span>{comments.length}</span>
                </div>
                <div className="commend-area__content">
                  {comments.length !== 0 ? (
                    <p>{comments[0].content}</p>
                  ) : (
                    <p>작성된 댓글이 없습니다.</p>
                  )}
                </div>
              </div>

            ) : (
              <div className="commend-area">
                <div className="commend-area__info">
                  <strong>댓글</strong>
                  <span>{comments.length}</span>
                </div>
                <div className="commend-area__content">
                  {comments.length !== 0 
                    ? (
                      <ul className='list'>
                        {comments.map((item, index) => 
                          <li key={index}>
                              <div className="user-info">
                                  <div className="user-thum" />
                                  <span>{item.User.userid}</span>
                              </div>
                              <p className="txt">{item.content}</p>
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p>작성된 댓글이 없습니다.</p>
                    )
                  }
                </div>
                {user && <CommendForm id={detail.id} />}
              </div>
            )
      }
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
    await store.dispatch(loadComment(context.params.id));

    // const { user } = store.getState().user;

    // if (!user) {
    //   return {
    //     redirect: {
    //       destination: '/intro',
    //       permanent: false,
    //     },
    //   };
    // }

    return {
      props: {},
    };
  },
);

export default Post;
