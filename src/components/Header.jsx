import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to={'/'} className="navbar-brand"><img src="src\assets\ana22.jpg" alt="" width="30" height="25" /></Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link " to={'/'}>Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/products'}>Produits</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/panier'}>Panier</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/contact'}>Contact</Link>
                            </li>
                        </ul>

                        <div>
                            <button className="btn btn-primary mx-2"><i className="bi bi-cart">🛒</i> 0</button>

                            <button className="btn btn-primary">Se connecter</button>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}