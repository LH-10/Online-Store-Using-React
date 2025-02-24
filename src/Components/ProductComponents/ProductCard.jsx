import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  function viewDetails() {
    navigate(`./product/${product.id}`);
  }
  
  return (
    <div className="product-card" onClick={viewDetails}>
      <div className="card-img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-info">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;