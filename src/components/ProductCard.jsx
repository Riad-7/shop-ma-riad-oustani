export default function ProductCard({name, price, image, inStock}) {

    return (
        <>
            <div className="card shadow-sm">
                <img src={image} className="card-img-top" alt="Product" />

                <div className="card-body">
                    <h5 className="card-title">{name}</h5>

                    <p className="fw-bold mb-1">${price}</p>

                    <button
                        className="btn btn-primary w-100"
                        disabled={!inStock}
                    >
                        {inStock ? "Add to Cart" : "Unavailable"}
                    </button>
                </div>
            </div>

        </>
    )

}