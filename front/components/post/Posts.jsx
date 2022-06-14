import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsSelector, clearPostState } from '@/reducers/slices/post';
import { librarySelector } from '@/reducers/slices/library';
import { loadPost, search, initPost } from '@/reducers/actions/post';
import { useRouter } from 'next/router';

import List from './List';
import SkeletonList from './SkeletonList';
import { useCallback } from 'react';

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
    searchError,
  } = useSelector(postsSelector);
  const { keyword } = useSelector(librarySelector)

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
  if (searchError) return <SearchDataNone keyword={keyword}  hasMorePosts={hasMorePosts} loadLoading={loadLoading} mainPosts={mainPosts} />;
  if (!mainPosts) return null;

  return (
    <>
      {addloading && skeletonList(1)}
    
      {
        mainPosts.length > 0 
          ?
            mainPosts.map((post) => (
              <List
                key={post.id}
                id={post.id}
                images={post.Images}
                title={post.title}
                content={post.content}
              />
            ))
          : <p className='posts-none'>게시글이 없습니다.</p>
      }

      {loadLoading && skeletonList(1)}
    </>
  );
};

const SearchDataNone = ({keyword}) => {
  const dispatch = useDispatch();

  const reload = useCallback(()=>{
    dispatch(search(""));
  }, [])

  return (
    <div className='dataNone'>
      <strong>"{keyword}" 관련된</strong>
      <strong>검색결과가 없습니다.</strong>
      <button type="button" className='btn' onClick={reload}>다시 불러오기</button>
    </div>
  )
}

export default Posts;
