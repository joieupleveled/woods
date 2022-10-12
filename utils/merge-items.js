export function mergeItems(woods, arrayOfIds) {
  return woods.map((wood) => {
    return {
      ...wood,
      inBag: arrayOfIds.includes(wood.id), //true or false
      amount: arrayOfIds.reduce((counter, id) => {
        return wood.id === id ? (counter += 1) : counter;
      }, 0),
    };
  });
}

//merges the info about the individual wood from the database with the array of ids (=woods selected by user, inBag = true) and
// calculates the amount based on the same array. Returns ALL woods from database with inBag true or false. >> final-bag.js
