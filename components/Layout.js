/* eslint-disable react/no-unknown-property */
import { css } from '@emotion/react';
import Head from 'next/head';
import { Dispatch, SetStateAction } from 'react';
import { ShoppingCartItem } from '../utils/types';
import Footer from './Footer';
import Header from './Header';

const mainStyles = css`
  padding: 10px 20px;
  margin: 50px;
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main css={mainStyles}>{props.children}</main>
      <Footer />
    </>
  );
}
