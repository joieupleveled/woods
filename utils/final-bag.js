import { mergeItems } from './merge-items';

export function finalBag(woods, arrayOfIds) {
  return mergeItems(woods, arrayOfIds).filter((item) => item.inBag === true);
}

//filters items that are inBag = true! >> total-sum.js
