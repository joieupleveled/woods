import Cookies from 'js-cookie';

export function getParsedCookie(key: string): WoodCookieItem[] | undefined {
  const cookieValue = Cookies.get(key); // Type string | Undefined

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type should be a string
  } catch (err) {
    return undefined;
  }
}

type WoodCookieItem = {
  id: string | number;
  quantity: number;
};

export function setStringifiedCookie(key: string, value: WoodCookieItem[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function stringifyCookieValue(value: WoodCookieItem[]) {
  return JSON.stringify(value);
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function subtractItemByProductId(id) {
  // newCookieValue is the decoded version of whatever is inside the cookie; currently an array
  const newCookieValue = [...getShoppingCartCookieValue()];

  // id that we're passing and the id of the product
  const productIdInCookie = newCookieValue.find((p) => p.id === id);

  if (productIdInCookie.quantity > 1) {
    productIdInCookie.quantity = productIdInCookie.quantity - 1;
  } else {
    // get index of product with the id that's passed as a parameter
    const removeIndex = newCookieValue
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);

    // remove object
    newCookieValue.splice(removeIndex, 1);
  }

  // this function creates the cookie
  Cookies.set('shoppingCart', newCookieValue);

  return newCookieValue;
}

// export function getShoppingCartCookieValue() {
//   const cookieValue = Cookies.getJSON('shoppingCart');

//   // Is the cookieValue an array? Test!
//   return Array.isArray(cookieValue)
//     ? // yes? return the array value
//       cookieValue
//     : // no? return an empty array
//       [];
// }

// export function addItemByProductId(id: number) {
//   // (How to) get the value of the cookie count in the array?
//   const newCookieValue = [...getShoppingCartCookieValue()];

//   // (How to) pass the cookie id and product id?
//   const productIdInCookie = newCookieValue.find((p) => p.id === id);

//   if (productIdInCookie) {
//     productIdInCookie.quantity = productIdInCookie.quantity + 1;
//   } else {
//     newCookieValue.push({
//       id: id,
//       quantity: 1,
//     });
//   }

//   // create a cookie
//   Cookies.set('shoppingCart', newCookieValue);

//   // in shopping cart
//   return newCookieValue;
// }

// export function subtractItemByProductId(id: number) {
//   // (How to) get the value of the cookie count in the array?
//   const newCookieValue = [...getShoppingCartCookieValue()];

//   // (How to) pass the cookie id and product id?
//   const productIdInCookie = newCookieValue.find((p) => p.id === id);

//   if (productIdInCookie > 1) {
//     productIdInCookie.quantity = productIdInCookie.quantity - 1;
//   } else {
//     // get the index of the product id that was passed as param
//     const removeIndex = newCookieValue
//       .map(function (item) {
//         return item.id;
//       })

//       .indexOf(id);

//     // remove object
//     newCookieValue.splice(removeIndex, 1);
//   }

//   // create a cookie
//   Cookies.set('shoppingCart', newCookieValue);

//   // in shopping cart
//   return newCookieValue;
// }

// export function removeItemByProductId(id: number) {
//   // (How to) get the value of the cookie count in the array?
//   const newCookieValue = [...getShoppingCartCookieValue()];

//   // (How to) pass the cookie id and product id?
//   const productIdInCookie = newCookieValue.find((p) => p.id === id);

//   // get the index of the product id that was passed as param
//   const removeIndex = newCookieValue
//     .map(function (item) {
//       return item.id;
//     })

//     .indexOf(id);

//   // remove object
//   newCookieValue.splice(removeIndex, 1);

//   if (productIdInCookie) {
//     productIdInCookie.quantity = 0;
//   } else {
//     alert('remove item by product id');
//   }

//   // create a cookie
//   Cookies.set('shoppingCart', newCookieValue);

//   // in shopping cart
//   return newCookieValue;
// }

// // parseCookieValue = getParsedCookieValue
// export function getParsedCookieValue(value: any) {
//   try {
//     return JSON.parse(value); // type should be a string
//   } catch (err) {
//     return undefined;
//   }
// }

// type WoodCookieItem = {
//   id: string | number;
//   quantity: number;
// };

// export function setStringifiedCookie(key: string, value: WoodCookieItem[]) {
//   Cookies.set(key, JSON.stringify(value));
// }
