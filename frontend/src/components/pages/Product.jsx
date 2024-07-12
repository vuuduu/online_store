import { useParams } from "react-router-dom";

const Product = () => {
    const { productid } = useParams();

    return (
        <h1> This is a product {productid} page </h1>
    )
}

export default Product;