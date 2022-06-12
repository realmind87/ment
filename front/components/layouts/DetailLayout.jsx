import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { userSelector } from '@/reducers/slices/user';
import { postsSelector, clearPostRemove } from '@/reducers/slices/post';
import { removePost } from '@/reducers/actions/post';

function DetailLayout({ children, detail, userId}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(userSelector);
  const { removePostDone } = useSelector(postsSelector);
  const currentUserId = user?.id;
    
  useEffect(() => {
    if (removePostDone) {
      dispatch(clearPostRemove());
      router.replace('/');
    }
  }, [dispatch, removePostDone, router]);

  const onRemovePost = useCallback(() => {
    dispatch(removePost(detail.id));
  }, [])

  return (
    <div className="detail">
      <Head>
        <meta name="description" content={detail.content} />
        <meta
          property="og:title"
          content={`${detail.User.userid}님의 게시글`}
        />
        <meta property="og:description" content={detail.content} />
        <meta
          property="og:image"
          content={
            detail.Images[0]
              ? detail.Images[0].src
              : 'https://nodebird.com/favicon.ico'
          }
        />
        <meta
          property="og:url"
          content={`https://nodebird.com/post/${detail.id}`}
        />

        <title>{detail.User.userid} 남의 글입니다.</title>
      </Head>
      
      <header>
        <div className='inner'>
          <Link href="/">
            <button type="button" className="btn__back">
              뒤로가기
            </button>
          </Link>

          <strong>목록으로</strong>

          {userId === currentUserId && (
            <button type="button" className="btn" onClick={onRemovePost}>
              삭제
            </button>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}

export default DetailLayout;
