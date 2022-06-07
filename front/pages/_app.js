import React, { useEffect } from 'react';
import { wrapper } from '../store';
import Head from 'next/head';
import '../styles/layout.scss';
import { Loading } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { device, loading, librarySelector } from '../reducers/slices/library';

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(librarySelector)
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
      { isLoading && <Loading /> }
    </>
  );
}

export default wrapper.withRedux(App);
