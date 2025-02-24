import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../../redux/productsSlice';
import axios from "axios"
import "./ProductList.css"

export default function ProductList(){

    const dispatch = useDispatch();

    const { productsToDisplay, loading, error } = useSelector(state => state.products);
    useEffect(() => {
        const fetchProducts = async () => {
          dispatch(setLoading()); 
          try {
            const response = await axios.get('https://fakestoreapi.com/products');  
            const data =  response.data;
            console.log(data)
            dispatch(setProducts(data));  
          } catch (error) {
            dispatch(setError(error.toString()));  
          }
        };
    
        fetchProducts();
      }, []);  
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

    return(
        <>
        <div style={{display:"flex"}}>

            <div className="cards-container">
            {productsToDisplay?productsToDisplay.map((currentProduct)=>(
                <ProductCard key={currentProduct.id} product={currentProduct}/>
            )):<></>}
            </div>
            </div>
        </>
    )
}

