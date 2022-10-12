export function total(shoppingBag) {
  return shoppingBag.reduce(function (prev, cur) {
    return prev + cur.price * cur.amount;
  }, 0);
}

//calculates the total sum to pay from the shopping bag (= final bag). This is also displayed on the checkout page!
