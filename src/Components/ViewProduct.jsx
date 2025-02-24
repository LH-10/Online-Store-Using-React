import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewProduct.css";
import ratingicon from "../assets/star.png"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ViewProduct = () => {
    const dispatch=useDispatch()
    const crtcount=useSelector((state)=>state.cart.count)
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProductData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    
    console.log(crtcount)
    dispatch(addToCart());
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!productData) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="modal-container">
      <button className="close-button" onClick={() => navigate(-1)}>×</button>
      <div className="modal-content">
        <div className="product-image">
          <img src={productData.image || "/placeholder.svg"} alt={productData.title} />
        </div>
        <div className="info-section">
          <h2 className="title">{productData.title}</h2>
          <div className="rating-area">
            <span> {productData.rating.rate} <img src={ratingicon}/> | </span>
            <span>{productData.rating.count} Ratings</span>
          </div>
          <p className="product-price">${productData.price.toFixed(2)}</p>
          <p className="product-description">{productData.description}</p>
          <div className="add-to-cart-btn" onClick={()=>{handleAddToCart()}}>
            <button type="button"  >Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;