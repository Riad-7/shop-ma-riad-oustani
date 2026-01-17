import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f8f9fa" }}
        >
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h3 className="mb-4">Oops! Page non trouvée</h3>
            <p className="text-muted mb-4">
                La page que vous cherchez n'existe pas ou a été déplacée.
            </p>
            <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
            >
                Retour à l'accueil
            </button>
        </div>
    );
}

export default NotFound;
