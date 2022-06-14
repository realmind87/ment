import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { wrapper } from '../../store';
import { postsSelector } from '@/reducers/slices/post';
import { DetailLayout } from '@/components/index';
import { loadDetail, likePost, unLikePost, removePost } from '@/reducers/actions/post';
import { userInfo } from '@/reducers/actions/auth';
import { userSelector } from '@/reducers/slices/user';
import useApp from '@/hooks/useApp'
import backUrl from '../../config'
import { PostLayout, Posts } from '../components';

function Hashtag() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { detail, detailloading, mainPosts } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);

  
  const onHashTagLoad = useCallback((hashtag)=>{
    // const {} = hashtag;
    // dispatch()
  }, [])
  
  if (detailloading) return <SkeletonDetail />;
  if (!detail) return null;
    
  return (
    <PostLayout>
      
    </PostLayout>
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

    return {
      props: {},
    };
  },
);

export default Hashtag;
