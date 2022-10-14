/* eslint-disable react/no-unknown-property */
import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getWoodById, Wood } from '../../database/woods';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

const woodStyles = css`
  border-radius: 20%;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

// Annotate the type Props
type Props =
  | {
      wood: Wood;
    }
  | {
      error: string;
    };

export default function SingleWood(props: Props) {
  // Early return pattern
  if ('error' in props) {
    return (
      <div>
        <Head>
          <title>Wood not found</title>
          <meta name="Description" content="Wood not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/woods">Woods page</Link>
      </div>
    );
  }

  // Whatever we type on browser link after the world 'woods', it will automatically render this product page
  return (
    <div css={woodStyles}>
      <Head>
        <title>
          {props.wood.name}, the {props.wood.type}
        </title>
        <meta
          name="Description"
          content={`${props.wood.name} is a ${props.wood.type} with a ${props.wood.description} with a price of ${props.wood.price}`}
        />
      </Head>

      <h2>{props.wood.name}</h2>
      <Image
        src={`/${props.wood.id}-${props.wood.name.toLowerCase()}.jpeg`}
        alt=""
        width="150"
        height="200"
      />
      <div>Type: {props.wood.type}</div>
      <div>Description: {props.wood.description}</div>
      <div>Price: €{props.wood.price}</div>

      {/* implement cookies below */}

      <div>
        <button
          onClick={() => {
            // 1. How to get the value of the cookie count. Change the 'stars' into 'quantity'
            const currentCookieValue = getParsedCookie('quantity');

            //if there is no cookie, initialise the count with 1
            if (!currentCookieValue) {
              setStringifiedCookie('quantity', [
                { id: props.wood.id, quantity: -1 },
              ]);
              return;
            }

            // how to find the object that match the id of the page?
            const foundCookie = currentCookieValue.find(
              (cookieWoodObject) => cookieWoodObject.id === props.wood.id,
            );

            //if an object is not found, add a new object
            if (!foundCookie) {
              currentCookieValue.push({
                id: props.wood.id,
                quantity: -1,
              });
            } else {
              // if an object is found, update the quantity
              foundCookie.quantity--;
            }
            // set the new value of the cookie
            setStringifiedCookie('quantity', currentCookieValue);
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            // 1. How to get the value of the cookie count. Change the 'stars' into 'quantity'
            const currentCookieValue = getParsedCookie('quantity');

            //if there is no cookie, initialise the count with 1
            if (!currentCookieValue) {
              setStringifiedCookie('quantity', [
                { id: props.wood.id, quantity: 1 },
              ]);
              return;
            }

            // how to find the object that match the id of the page?
            const foundCookie = currentCookieValue.find(
              (cookieWoodObject) => cookieWoodObject.id === props.wood.id,
            );

            //if an object is not found, add a new object
            if (!foundCookie) {
              currentCookieValue.push({
                id: props.wood.id,
                quantity: 1,
              });
            } else {
              // if an object is found, update the quantity
              foundCookie.quantity++;
            }
            // set the new value of the cookie
            setStringifiedCookie('quantity', currentCookieValue);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  // console.log(context.query);

  // Retrieve the wood ID from the URL
  const woodId = parseIntFromContextQuery(context.query.woodId);

  if (typeof woodId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Wood not found',
      },
    };
  }

  const foundWood = await getWoodById(woodId);

  if (typeof foundWood === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Wood not found',
      },
    };
  }
  return {
    props: {
      wood: foundWood,
    },
  };
}
