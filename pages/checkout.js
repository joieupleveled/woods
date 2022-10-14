import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { getWoods } from '../database/woods';
import { calculateTotalSum, total } from '../utils/total-sum';
import { calculateTotalQuantity } from '../utils/totalQuantity';

export default function Checkout(props) {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [finalShoppingCartArray] = useState(props.finalShoppingCartArray);
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    // Does error exist? remove from object
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const {
      firstname,
      lastname,
      mail,
      address,
      country,
      zip,
      city,
      creditcardholder,
      creditcardnumber,
      creditcardexpirydate,
      creditcardcvv,
    } = form;
    const newErrors = {};
    // first and last name errors
    if (!firstname || firstname === '') {
      newErrors.firstname = 'Please enter your first name!';
    } else if (firstname.length > 40) {
      newErrors.firstname = 'First name is too long!';
    }
    if (!lastname || lastname === '') {
      newErrors.lastname = 'Please enter your last name!';
    } else if (lastname.length > 40) {
      newErrors.lastname = 'Last name is too long!';
    }
    // mail errors
    if (!mail || mail === '') {
      newErrors.mail = 'Please enter an e-mail address!';
    } else if (!mail.includes('@')) {
      newErrors.mail = 'Please enter a valid e-mail address!';
    }
    // address errors
    if (!address || address === '') {
      newErrors.address = 'Please enter your address!';
    } else if (address.length > 100) {
      newErrors.address = 'The address is too long!';
    }
    // zip code errors
    if (!zip || zip.length > 5 || zip.length < 4) {
      newErrors.zip = 'Please enter a valid ZIP Code!';
    }
    // city errors
    if (!city || city === '') {
      newErrors.city = 'Please enter a city!';
    }
    // country errors
    if (!country || country === '') {
      newErrors.country = 'Please select a country!';
    }
    // credit card holder errors
    if (!creditcardholder || creditcardholder.length > 40) {
      newErrors.creditcardholder = 'Please enter a credit card holder!';
    }
    // credit card number errors
    if (!creditcardnumber || creditcardnumber.length !== 16) {
      newErrors.creditcardnumber = 'Please enter a valid credit card number!';
    }
    // credit card expiry date errors
    if (
      !creditcardexpirydate ||
      creditcardexpirydate.length !== 5 ||
      !creditcardexpirydate.includes('/')
    ) {
      newErrors.creditcardexpirydate =
        'Please enter a expiry date in the format of MM/YY!';
    }
    // cvv errors
    if (!creditcardcvv || creditcardcvv.length !== 3) {
      newErrors.creditcardcvv = 'Please enter a valid CVV!';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      router.push('/thank-you/');
    }
  };

  // calculate the total sum of products inside shopping cart
  const totalSum = calculateTotalSum(finalShoppingCartArray);
  const quantity = calculateTotalQuantity(props.shoppingCart);

  return (
    <Layout
      shoppingCart={props.shoppingCart}
      setShoppingCart={props.setShoppingCart}
    >
      <Head>
        <title>Checkout</title>
      </Head>
      <h1>Checkout</h1>
      <div css={checkoutPageContainer}>
        <div css={formContainer}>
          <h2>Contact Information</h2>
          <Form>
            <div css={inputContainer}>
              {/* First Name */}
              <Form.Group css={input}>
                <Form.Label htmlFor="firstname">First Name</Form.Label>
                <Form.Control
                  data-cy="first-name"
                  type="text"
                  id="firstname"
                  placeholder="Maria"
                  onChange={(e) => setField('firstname', e.target.value)}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.firstname}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Last Name */}
              <Form.Group css={input}>
                <Form.Label htmlFor="lastname">Last name</Form.Label>
                <Form.Control
                  data-cy="last-name"
                  type="text"
                  id="lastname"
                  placeholder="Musterfrau"
                  onChange={(e) => setField('lastname', e.target.value)}
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.lastname}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {/* E-Mail */}
            <Form.Group>
              <Form.Label htmlFor="mail">Mail</Form.Label>
              <Form.Control
                data-cy="mail"
                type="mail"
                id="mail"
                placeholder="maria.musterfrau@gmail.com"
                onChange={(e) => setField('mail', e.target.value)}
                isInvalid={!!errors.mail}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.mail}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Phone Number */}
            <Form.Group>
              <Form.Label htmlFor="phonenumber">
                Phone Number (optional)
              </Form.Label>
              <Form.Control
                data-cy="phone-number"
                type="number"
                id="phonenumber"
                placeholder="0676/83167423"
                onChange={(e) => setField('phone', e.target.value)}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <h2>Shipping Information</h2>
            {/* Address */}
            <Form.Group>
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                data-cy="address"
                type="text"
                id="address"
                placeholder="Cat street 74/7"
                onChange={(e) => setField('address', e.target.value)}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <div css={inputContainer}>
              {/* ZIP Code */}
              <Form.Group css={input}>
                <Form.Label htmlFor="zipcode">Zip Code</Form.Label>
                <Form.Control
                  data-cy="zip-code"
                  type="number"
                  id="zipcode"
                  placeholder="1010"
                  onChange={(e) => setField('zip', e.target.value)}
                  isInvalid={!!errors.zip}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
              {/* City */}
              <Form.Group css={input}>
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control
                  data-cy="city"
                  type="text"
                  id="city"
                  placeholder="Vienna"
                  onChange={(e) => setField('city', e.target.value)}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {/* Country */}
            <Form.Group>
              <Form.Label htmlFor="country">Country</Form.Label>
              <Form.Control
                data-cy="country"
                as="select"
                id="country"
                onChange={(e) => setField('country', e.target.value)}
                isInvalid={!!errors.country}
              >
                <option value="">Select a country:</option>
                <option value="austria">Austria</option>
                <option value="germany">Germany</option>
                <option value="switzerland">Switzerland</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
            <h2>Payment Information</h2>
            {/* Credit Card Holder */}
            <Form.Group>
              <Form.Label htmlFor="creditcardholder">
                Credit Card Holder
              </Form.Label>
              <Form.Control
                data-cy="credit-card-holder"
                type="text"
                id="creditcardholder"
                placeholder="Maria Musterfrau"
                onChange={(e) => setField('creditcardholder', e.target.value)}
                isInvalid={!!errors.creditcardholder}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.creditcardholder}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Credit Card Information */}
            <Form.Group>
              <Form.Label htmlFor="creditcardnumber">
                Credit Card Number
              </Form.Label>
              <Form.Control
                data-cy="credit-card-number"
                type="number"
                id="creditcardnumber"
                placeholder="1657895432567887"
                onChange={(e) => setField('creditcardnumber', e.target.value)}
                isInvalid={!!errors.creditcardnumber}
              />
              <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                {errors.creditcardnumber}
              </Form.Control.Feedback>
            </Form.Group>
            <div css={inputContainer}>
              {/* Expiry date */}
              <Form.Group css={input}>
                <Form.Label htmlFor="expirydate">Expiry Date</Form.Label>
                <Form.Control
                  data-cy="credit-card-expiry-date"
                  type="text"
                  id="expirydate"
                  placeholder="MM/YY"
                  onChange={(e) =>
                    setField('creditcardexpirydate', e.target.value)
                  }
                  isInvalid={!!errors.creditcardexpirydate}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.creditcardexpirydate}
                </Form.Control.Feedback>
              </Form.Group>
              {/* CVV */}
              <Form.Group css={input}>
                <Form.Label htmlFor="cvv">CVV</Form.Label>
                <Form.Control
                  data-cy="credit-card-cvv"
                  type="text"
                  id="cvv"
                  placeholder="777"
                  onChange={(e) => setField('creditcardcvv', e.target.value)}
                  isInvalid={!!errors.creditcardcvv}
                />
                <Form.Control.Feedback type="invalid" css={feedbackStyle}>
                  {errors.creditcardcvv}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            {/* Pay Button */}
            <button
              data-cy="pay-button"
              type="submit"
              className="button-default"
              onClick={(e) => handleSubmit(e)}
            >
              Pay {totalSum} €
            </button>
          </Form>
        </div>
        <div css={totalSumContainer}>
          <h3>
            {quantity} {quantity > 1 ? 'items' : 'item'} in cart:
          </h3>
          {finalShoppingCartArray.map((p) => {
            return (
              <div css={totalInCartStyle} key={`wood-${props.wood.id}`}>
                <div css={floatContainer}>
                  <p className="left">
                    {props.wood.quantity}x {props.wood.name}
                  </p>
                  <p className="right">
                    {((props.wood.price / 100) * props.wood.quantity).toFixed(
                      2,
                    )}{' '}
                    €
                  </p>
                  <div className="clear"> </div>
                </div>
              </div>
            );
          })}
          <br />

          <div>
            <h3 className="left">Total Sum:</h3>
            <h3 className="right">{totalSum} €</h3>
            <div className="clear"> </div>
          </div>

          <br />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const woods = await getWoods();

  const rawCookie = context.req.cookies.shoppingCart;
  const cookieArray = rawCookie ? JSON.parse(rawCookie) : [];

  const finalShoppingCartArray = cookieArray.map((p) => {
    const draftShoppingCartObject = woods.find((prod) => prod.id === p.id);
    return {
      id: draftShoppingCartObject.id,
      name: draftShoppingCartObject.name,
      src: draftShoppingCartObject.src,
      price: draftShoppingCartObject.price,
      quantity: props.wood.quantity,
    };
  });

  console.log('finalShoppingCartArray', finalShoppingCartArray);

  return {
    props: {
      woods,
      finalShoppingCartArray,
    },
  };
}
