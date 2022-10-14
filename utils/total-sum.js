export function calculateTotalSum(productsArray) {
  return productsArray.reduce(function (prev, wood) {
    return prev + wood.price * wood.amount;
  }, 0);
}

// calculates the total sum to pay from the shopping bag (= final bag). This is also displayed on the checkout page!
