import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelector, clearPostState } from '@/reducers/slices/post';
import { loadPost, initPost } from '@/reducers/actions/post';
import { useRouter } from 'next/router';

import List from './List';
import SkeletonList from './SkeletonList';

const skeletonList = (number) => {
  const _result = [];
  for (let i = 0; i < number; i++) {
    _result.push(<SkeletonList key={i} />);
  }
  return _result;
};

const Posts = () => {
  const dispatch = useDispatch();
  const {
    mainPosts,
    hasMorePosts,
    loadLoading,
    addloading,
    initPostError,
    initPostLoading,
  } = useSelector(postsSelector);

  const router = useRouter();

  useEffect(() => {
    return () => dispatch(clearPostState());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 10
      ) {
        if (hasMorePosts && !loadLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPost(lastId));
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMorePosts, loadLoading, mainPosts]);

  if (initPostLoading) return skeletonList(10);
  //if (initPostError) router.push('/intro');
  if (!mainPosts) return null;

  return (
    <>
      {addloading && skeletonList(1)}
      {mainPosts.map((post) => (
        <List
          key={post.id}
          id={post.id}
          images={post.Images}
          title={post.title}
          content={post.content}
        />
      ))}
      {loadLoading && skeletonList(1)}
    </>
  );
};

export default Posts;
