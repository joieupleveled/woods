import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getServerSideProps } from './woods';

const intro = css`
  display: flex;
  justify-content: center;
  font-family: 'Quicksand', sans-serif;
  margin-bottom: 50px;
  font-size: 180%;
  font-weight: 700;
  color: brown;
`;

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Austria's Leading Firewood Supplier</title>
      </Head>

      <h1 css={intro}>Austria's Leading Firewood Supplier</h1>

      {/* NExt.js Image component will perform some optimisation such as:

      -Blocking the space on the page for the image before it loads(to reduce shift of content)

      -Image optimisation(reduction in quality to deliver images faster) */}

      <Image
        src="/familyfirewood.jpeg"
        alt="gudetama, the lazy egg laying down and saying 'the future... I can't'"
        width="511"
        height="338"
      />

      {/* You can also use the normal image tag if you do not want these optimisations */}
      {/* <img
        src="/familyfirewood.jpeg"
        alt="gudetama, the lazy egg laying down and saying 'the future... I can't'"
      /> */}
      {/* <Image */}
    </>
  );
}
