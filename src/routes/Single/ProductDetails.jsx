import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import './ProductDetails.css'; 

const ProductDetails = () => {
    const { id } = useParams(); 
    const { data } = useGetProductsQuery();

    const product = data?.payload?.find((item) => item._id === id);

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div className="product-details-container">
            <img className="product-image-large" src={product.product_images[0]} alt={product.product_name} />
            <h1 className="product-name-large">{product.product_name}</h1>
            <p className="product-price-large">${product.sale_price}</p>
            <p className="product-description-large">{product.description}</p>
            <p className="product-category-large">Category: {product.category}</p>
            <p className="product-rating-large">Rating: {product.rating}</p>
            <button className="buy-now-btn">Buy Now</button>
        </div>
    );
};

export default ProductDetails;
