import {
  addItemByProductId,
  removeItemByProductId,
  subtractItemByProductId,
} from '../utils/cookies';

export default function QuantityButtons(props) {
  return (
    <>
      <button
        data-cy="decrease-quantity-cart"
        className="button-small"
        onClick={() => {
          props.setShoppingCart(subtractItemByProductId(props.productId));
        }}
      >
        -
      </button>
      {props.quantity}{' '}
      <button
        data-cy="increase-quantity-cart"
        className="button-small"
        onClick={() => {
          props.setShoppingCart(addItemByProductId(props.productId));
        }}
      >
        +
      </button>
      <button
        data-cy="remove-from-cart"
        className="button-small-noborder"
        onClick={() => {
          props.setShoppingCart(removeItemByProductId(props.productId));
        }}
      ></button>
    </>
  );
}
