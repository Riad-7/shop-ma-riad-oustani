export default function ProductCard({ title, price, image, category }) {
    const shortTitle = title.slice(0, 30) + " ...";
    return (
        <>
            <div
                className="card h-100 text-center p-3"
                style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "0.3s",
                }}
            >
                <img
                    src={image}
                    className="card-img-top"
                    alt="Product"
                    style={{ width: "150px", height: "150px", objectFit: "contain", margin: "0 auto" }}
                />

                <div className="card-body">
                    <h5 className="card-title">{shortTitle}</h5>

                    <p className="fw-bold mb-2 text-success">${price}</p>

                    <span className="badge text-bg-primary mb-3">{category}</span>

                    {/* Boutons */}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-dark w-50">
                            Voir détails
                        </button>

                        <button className="btn btn-dark w-50">
                            Ajouter
                        </button>
                    </div>
                </div>
            </div>



        </>
    )

}