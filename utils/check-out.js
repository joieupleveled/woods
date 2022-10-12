import Head from 'next/head';
import Layout from '../components/Layout';
import { finalBag } from './final-bag';
import { total } from './total-sum';

export default function CheckOut(props) {
  const shoppingBag = finalBag(props.woods, props.arrayOfIds);
  const totalSum = total(shoppingBag);

  return (
    <div>
      <Layout numberOfItems={props.numberOfItems}>
        <Head>
          <title>Check-out</title>
        </Head>
        <h1 css={title}>Pay now </h1>
        <h1 css={title}> Total: {totalSum} €</h1>

        <main>
          <form css={container} action="/thank-you">
            <div css={column}>
              <h3> Address (required)</h3>
              <label htmlFor="fname">Full Name</label>
              <br />
              <input
                css={input}
                type="text"
                id="fname"
                name="fullname"
                placeholder="John M. Doe"
                required
              />
              <span class="validity"></span>
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                css={input}
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                required
              />
              <span class="validity"></span>
              <br />
              <label htmlFor="adr">Address</label>
              <br />
              <input
                css={input}
                type="text"
                id="adr"
                name="address"
                placeholder="542 W. 15th Street"
                required
              />
              <span class="validity"></span>
              <br />
              <label htmlFor="zip">Zip code</label>
              <br />
              <input
                css={input}
                type=""
                id="zip"
                name="zip"
                placeholder="10001"
                required
              />
              <span class="validity"></span>
              <br />
              <label htmlFor="city">City</label>
              <br />
              <input
                css={input}
                type="text"
                id="city"
                name="city"
                placeholder="New York"
                required
              />
              <span class="validity"></span>
              <br />
            </div>
            <div css={column}>
              <h3>Payment (required)</h3>
              <label htmlFor="cname">Name on Card</label>
              <br />
              <input
                css={input}
                type="text"
                id="cname"
                name="cardname"
                placeholder="John More Doe"
                required
              />
              <span class="validity"></span>
              <br />
              <label htmlFor="ccnum">Credit card number</label>
              <br />
              <input
                css={input}
                type="text"
                id="ccnum"
                name="cardnumber"
                placeholder="1111-2222-3333-4444"
                required
              />
              <span class="validity"></span>
              <br />
              <label htmlFor="expmonth">Exp Month</label>
              <br />
              <input
                css={input}
                type="text"
                id="expmonth"
                name="expmonth"
                placeholder="September"
                required
              />
              <span class="validity"></span>
              <br />
              <label htmlFor="expyear">Exp Year</label>
              <br />
              <input
                css={input}
                type="number"
                id="expyear"
                name="expyear"
                placeholder="2020"
                min="2020"
              />
              <span class="validity"></span>
              <br />
              <span class="validity"></span>
              <label htmlFor="cvv">CVV</label>
              <br />
              <input
                css={input}
                type="text"
                id="cvv"
                name="cvv"
                placeholder="352"
                required
                minlength="3"
                maxLength="3"
              />
              <span class="validity"></span>
              <br />
            </div>
            <button data-cy="confirm-button" css={button}>
              Confirm
            </button>
          </form>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  //comes from next-cookie

  const arrayOfIds = arrayOfIds || [];
  const numberOfItems = numberOfItems || '0';

  // dynamic import, imports all woods from database
  const { getWoods } = await import('../database/connect');
  const woods = await getWoods();

  return {
    props: {
      arrayOfIds,
      numberOfItems,
      woods,
    },
  };
}
