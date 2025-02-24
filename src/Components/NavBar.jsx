import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts, setLoading, setError } from "../redux/productsSlice";
import axios from "axios";
import "./NavBar.css";
import Menu from "../assets/menuicon.png";
import Search from "../assets/search.png";
import ShoppingCart from "../assets/cart.png";
import X from "../assets/cross.png";
import { useSelector } from 'react-redux';
const NavBar = () => {
  const cartCount = useSelector((state) => state.cart.count);
  const searchTerm = useRef("electronics");
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = async () => {
    dispatch(setLoading());
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/category/${searchTerm.current.value}`);
      dispatch(setProducts(response.data));
    } catch (error) {
      dispatch(setError(error.toString()));
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="navbar-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <img src={Menu} />
            </button>
            <Link to="/" className="navbar-logo" onClick={()=>{useNavigate("/")}}>
              MyStore
            </Link>
          </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for category"
            ref={searchTerm}
            list="categories"
            onKeyDown={(e)=>e.key==="Enter"?handleSearch():null}
          />
          <datalist id="categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
          <button onClick={() => handleSearch()}>
            <img src={Search} height="20px" width="20px"/>
          </button>
        </div>
          <Link to="/cart" className="cart-icon">
            <img src={ShoppingCart} height="26px" width="26px"/>
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar" onClick={toggleSidebar}>
          <img src={X} height="24px" width="24px"/>
        </button>
        <ul className="nav-menu sidebar-menu">
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/browse" onClick={toggleSidebar}>Browse</Link></li>
          <li><Link to="/about" onClick={toggleSidebar}>About</Link></li>
        </ul>
      </div>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </nav>
  );
};

export default NavBar;