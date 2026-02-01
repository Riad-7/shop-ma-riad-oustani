import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart, increment, decrement } from "../features/cart/cartSlice";

function Panier() {
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => Number(state.cart.totalPrice.toFixed(2)));

  if (cartItems.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h4>🛒 Votre panier est vide</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Votre Panier</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>
                <img src={item.image} width="50" className="me-2" />
                {item.title}
              </td>
              <td>{item.price} DH</td>
              <td>
                <button
                  className="btn btn-sm btn-secondary me-1"
                  onClick={() => dispatch(decrement(item.id))}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="btn btn-sm btn-secondary ms-1"
                  onClick={() => dispatch(increment(item.id))}
                >
                  +
                </button>
              </td>
              <td>{Number(item.price * item.quantity)} DH</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end">
        <h4>Total : {totalPrice} DH</h4>

        <button
          className="btn btn-outline-danger me-2"
          onClick={() => dispatch(clearCart())}
        >
          Vider le panier
        </button>

        <button className="btn btn-success">
          Passer la commande
        </button>
      </div>
    </div>
  );
}

export default Panier;
