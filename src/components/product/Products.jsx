import React, { useState } from 'react';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { Link } from 'react-router-dom';
import './Products.css'; 

const Products = () => {
    const { data } = useGetProductsQuery();
    const [cart, setCart] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const toggleLike = (productId) => {
        if (likedProducts.includes(productId)) {
            setLikedProducts(likedProducts.filter(id => id !== productId));
        } else {
            setLikedProducts([...likedProducts, productId]);
        }
    };

    const filteredProducts = data?.payload?.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleSearchChange = (e) => {
        const input = e.target.value;
        setSearchTerm(input);

        if (input) {
            const newSuggestions = data?.payload?.filter(product =>
                product.product_name.toLowerCase().startsWith(input.toLowerCase())
            ).map(product => product.product_name);
            setSuggestions(newSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]); // Hide suggestions after selecting
    };

    return (
        <div className="products-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {searchTerm && (
                    <ul className={`suggestions-list ${suggestions.length > 0 ? 'show' : ''}`}>
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="products-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div className="product-card" key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <img className="product-image" src={product.product_images[0]} alt={product.product_name} />
                            </Link>
                            <h2 className="product-name">{product.product_name}</h2>
                            <p className="product-price">${product.sale_price}</p>
                            <p className="product-category">{product.category}</p>
                            <p className="product-rating">Rating: {product.rating}</p>

                            <button
                                className={`like-btn ${likedProducts.includes(product._id) ? 'liked' : ''}`}
                                onClick={() => toggleLike(product._id)}
                            >
                                {likedProducts.includes(product._id) ? '♥' : '♡'}
                            </button>

                            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default Products;
