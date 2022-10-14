import Head from 'next/head';
import Link from 'next/link';
import { getWoods } from '../database/woods';
import { getParsedCookie } from '../utils/cookies';

export default function Woods(props) {
  return (
    <>
      <Head>
        <title>Fruits turned into woods</title>
        <meta name="description" content="Biography of the animals" />
      </Head>

      {props.woods.map((wood) => {
        return (
          <div data-test-id={`wood-${wood.id}`} key={`wood-div-${wood.id}`}>
            <h2>
              <Link href={`/woods/${wood.id}`}>
                <a>{wood.name}</a>
                {/* <img
                  src={`/${
                    props.wood.id
                  }-${props.wood.name.toLowerCase()}.jpeg`}
                /> */}
              </Link>

              <br />
              <br />
            </h2>
            <div>
              {wood.name} Quantity:{' '}
              {getParsedCookie('quantity')?.find(
                (cookieWoodObject) => cookieWoodObject.id === wood.id,
              )?.quantity || 0}
            </div>
            <button>+</button>
            <button>-</button>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  console.log(context.req.cookies.quantity);

  // get the cookies from the request object and parse it if is not undefined
  const parsedCookies = context.req.cookies.quantity
    ? JSON.parse(context.req.cookies.quantity)
    : [];

  // Get the wood from database
  const woods = await getWoods();
  // loop over the database and add a new property called stars with either the value in the cookies or 0
  // const woods = woodsDatabase.map((wood) => {
  //   return {
  //     ...wood,
  //     quantity:
  //       parsedCookies.find((cookieWoodObject) => wood.id === cookieWoodObject.id)
  //         ?.quantity || 0,
  //   };
  // }
  return {
    props: {
      woods: woods,
    },
  };
}
