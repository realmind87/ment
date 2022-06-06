import React, { useEffect } from 'react';
import { wrapper } from '../store';
import Head from 'next/head';
import '../styles/layout.scss';

import { useDispatch } from 'react-redux';
import { device } from '../reducers/slices/library';

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const onResizing = () => {
    window.innerWidth >= 758 ? dispatch(device("desktop")) : dispatch(device("mobile"));
  }

  useEffect(()=>{
    onResizing();
    window.addEventListener('resize', onResizing);
    return () => window.removeEventListener('resize', onResizing)
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Ment</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
