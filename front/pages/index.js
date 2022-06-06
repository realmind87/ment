import React from 'react';
import { PostLayout, Posts } from '../components';
import { userInfo } from '../reducers/actions/auth';
import { initPost } from '../reducers/actions/post';
import { wrapper } from '../store';
import axios from 'axios';

const Main = () => {
  return (
    <PostLayout>
      <Posts />
    </PostLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await store.dispatch(userInfo());
    await store.dispatch(initPost());
    
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

export default Main;
