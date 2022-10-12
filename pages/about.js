import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const par = css`
  margin-bottom: 0px;
`;

const lefthalf = css`
  background-color: whitec;
  position: absolute;
  left: 60px;
  width: 50%;
`;

const righthalf = css`
  background-color: white;
  position: absolute;
  right: 60px;
  width: 50%;
`;


export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Biography of the woods" />
      </Head>
      <h1>About</h1>
      <h2>Sustainable</h2>
      <div>
        <p css={righthalf}>
          We use wood every day for sustainable consumption. For example, as
          paper. Or wood is used for interior decoration in your own four walls,
          from the floor to individual pieces of furniture.
          <br />
          Due to the particularly well existing thermal insulation properties,
          it is very popular in many households. Wood plays a particularly
          important role in climate protection, as it binds CO2 from the air.
          Thus, wood can permanently absorb and store carbon dioxide.
        </p>
        <br />
        <a css={lefthalf}>
          <Image
            src="/sustainability.jpeg"
            alt=" sustainable logging"
            width="450"
            height="350"
          />
        </a>
      </div>
    </>
  );
}
