import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">
                <div className="row justify-content-between">

                    <div className="col-md-4 mb-3">
                        <h5>Mon Site</h5>
                        <p>Une petite description du site ou de l'entreprise.</p>
                    </div>

                    <div className="col-md-3 mb-3">
                        <h5>Liens rapides</h5>
                        <ul className="list-unstyled">
                            <li><Link to={'/'} className="text-white-50 text-decoration-none">Accueil</Link></li>
                            <li><Link to={'/panier'} className="text-white-50 text-decoration-none">Panier</Link></li>
                            <li><Link to={'/contact'} className="text-white-50 text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-3">
                        <h5>Contact</h5>
                        <p className="text-white-50 mb-1">Email : contact@gmail.com</p>
                        <p className="text-white-50 mb-1">Téléphone : +212 6 00 00 00 00</p>
                    </div>

                </div>

                <hr className="border-secondary" />

                <div className="text-center text-white-50">
                    © 2026 Shpo Riad — Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
