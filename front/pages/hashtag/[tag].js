import React, {useEffect, useCallback} from 'react';
import { HashTagLayout, SkeletonList, List} from '@/components/index';
import { useDispatch, useSelector } from 'react-redux';
import { loadHashTagPosts } from '@/reducers/actions/post';
import { postsSelector } from '@/reducers/slices/post';
import { useRouter } from 'next/router';
import { wrapper } from '@/store/index';
import axios from 'axios';
import backUrl from '../../config'

const skeletonList = (number) => {
  const _result = [];
  for (let i = 0; i < number; i++) {
    _result.push(<SkeletonList key={i} />);
  }
  return _result;
};

function HashTags(){
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadLoading, loadDone, loadError } = useSelector(postsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 10) {
        if (hasMorePosts && !loadLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadHashTagPosts({lastId, 'hashtag': tag}));
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);

  }, [hasMorePosts, loadLoading, mainPosts]);

  const onRouterDetail = useCallback((id) => {
    router.push({pathname: `/post/${id}`});
  }, []);

  return (
    <HashTagLayout>
      <>
        <div className='hashtag-header'>
          <h1>#{tag}</h1>
          <p>#{tag} 관련된 총 {mainPosts.length}개의 포스트</p>
        </div>
        
        { mainPosts.length > 0 
            ?
              mainPosts.map(({id, title, content, User, Images, Likers, Comments}) => (
                <div className="box-type" key={id}>
                  {Images && Images.length > 0 && (
                    <div className="box-type__thumb">
                      <img src={`${backUrl}/${Images[0].src}`} />
                    </div>
                  )}
                  <div className='box-type__content'>
                    <strong className="tit" onClick={() => onRouterDetail(id)}>{title}</strong>
                    <p className="txt" onClick={() => onRouterDetail(id)}>{content.replace(/(<([^>]+)>)/ig,"").replace(/&nbsp;/ig,"")}</p>
                    <div className='info'>
                      <ul>
                        <li>
                          <div className='thumnail'><img src={`${backUrl}/${User.Images[0].src}`} /></div> 
                          <strong>{User.nickname}</strong>
                        </li>
                        <li className='comment'>{Comments.length} 댓글</li>
                        <li className='ico like'>{Likers && Likers.length}</li>
                      </ul>
                    </div>
                  </div>
                  
                </div>

                // <div key={post.id}>
                //   <h2>{post.title}</h2>
                //   <p>{post.content}</p>
                //   <div className='box-post-info'>
                //     <div className='user'>
                //     post.User
                //     </div>
                //   </div>
                // </div>
                // <List
                //   key={post.id}
                //   id={post.id}
                //   images={post.Images}
                //   title={post.title}
                //   content={post.content}
                //   user={post.User}
                //   likers={post.Likers}
                //   comments={post.Comments}
                // />
              ))
            : 
              <p className='posts-none'>게시글이 없습니다.</p>
        }
        {loadLoading && skeletonList(1)}
      </>
    </HashTagLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(loadHashTagPosts({lastId: 0, 'hashtag': context.params.tag}));
    
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

export default HashTags;
