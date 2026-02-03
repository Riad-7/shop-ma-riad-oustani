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
    <div className="container py-5">
    <div className="row d-flex justify-content-center my-4">
        
        {/* Colonne Liste des produits */}
        <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0 text-black">Mon Panier</h3>
                <h6 className="mb-0 text-muted">{cartItems.length} articles</h6>
            </div>

            {cartItems.length === 0 ? (
                <div className="alert alert-info text-center">Votre panier est vide.</div>
            ) : (
                cartItems.map((item) => (
                <div className="card rounded-3 mb-4 shadow-sm border-0" key={item.id}>
                    <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                            
                            {/* Image & Titre */}
                            <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                    src={item.image}
                                    className="img-fluid rounded-3"
                                    alt={item.title}
                                    style={{maxHeight: '80px', objectFit: 'contain'}}
                                />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                                <p className="lead fw-normal mb-2 fs-6">{item.title}</p>
                                <span className="text-muted small">Ref: {item.id}</span>
                            </div>

                            {/* Quantité */}
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
                                <button className="btn btn-link px-2 text-dark" onClick={() => dispatch(decrement(item.id))}>
                                    <i className="bi bi-dash fw-bold">-</i>
                                </button>
                                
                                <input 
                                    min="0" 
                                    value={item.quantity} 
                                    readOnly 
                                    type="number" 
                                    className="form-control form-control-sm text-center mx-2" 
                                    style={{width: '50px'}}
                                />

                                <button className="btn btn-link px-2 text-dark" onClick={() => dispatch(increment(item.id))}>
                                    <i className="bi bi-plus fw-bold">+</i>
                                </button>
                            </div>

                            {/* Prix & Delete */}
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 text-end">
                                <h5 className="mb-0 fw-bold">{Number(item.price * item.quantity).toFixed(2)} DH</h5>
                            </div>
                            
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button className="btn text-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                                    <i className="bi bi-trash">🗑️</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))
            )}
        </div>

        {/* Colonne Résumé (Total) */}
        <div className="col-md-4">
            <div className="card mb-4 border-0 shadow-sm bg-light">
                <div className="card-header py-3 bg-white border-0">
                    <h5 className="mb-0 fw-bold">Résumé</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush border-0">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0 bg-light">
                            Sous-total
                            <span>{totalPrice} DH</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-light">
                            Livraison
                            <span>Gratuite</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-top px-0 mb-3 bg-light fw-bold">
                            <div>
                                <strong>Total TTC</strong>
                            </div>
                            <span><strong>{totalPrice} DH</strong></span>
                        </li>
                    </ul>

                    <button className="btn btn-dark w-100 btn-lg rounded-pill mb-2 shadow-sm">
                        Passer la commande
                    </button>
                    
                    {cartItems.length > 0 && (
                        <button className="btn btn-outline-danger w-100 btn-sm mt-2" onClick={() => dispatch(clearCart())}>
                            Vider le panier
                        </button>
                    )}
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default Panier;
