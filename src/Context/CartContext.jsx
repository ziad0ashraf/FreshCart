import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export let CartContext = createContext()


export default function CartContextProvider({children}) {

    const [cartItems, setCartItems] = useState(null)
    const [loading, setLoading] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const [animationCart, setAnimationCart] = useState(false)

    let headers={
        token: localStorage.getItem('user-token')
    }

    async function addToCart(productId) {
        try {
            setCurrentId(productId)
            setLoading(true)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId
            },
            {
                headers
            }  
            )
            // console.log(data);
            toast.success(data.message,{duration:4000,})
            setCartItems(data)
            setLoading(false)
            setAnimationCart(true)
            setTimeout(() => setAnimationCart(false), 3000)
        } catch (error) {
            // console.log(error);
        }
    }
    
    async function getCartItems() {
        try {
            if (localStorage.getItem('user-token')) {
                let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
                // console.log(data);
                setCartItems(data)   
                return data        
            }
        } catch (error) {
            // console.log(error);  
        }
    }
    
    async function updateProduct(productId,count) {
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    count
                },
                {
                    headers
                },
            )
            setCartItems(data)
            return data
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteCart(productId) {
        try {
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
            setCartItems(data)
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function checkOut(shippingAddress) {
        try {
            setLoading(true)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems.data._id}?url=${window.location.origin}`,{
                shippingAddress
            },
            {
                headers
            }
        )
            // console.log(data);
            setLoading(false)
            window.location.href=data.session.url
            setCartItems(null)
            return data
        } catch (error) {
            setLoading(false)
            // console.log(error);
            toast.error(`Sorry Can't CheckOut Now`,{
                duration:4000,
            })
        }
    }
    async function clearCart() {
        try {
            setLoading(true)
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
            // console.log(data);
            setCartItems(data)
            setLoading(false)
        } catch (error) {
            // console.log(error);
        }
    }

        
    useEffect(() => {
        getCartItems()
    }, [])
    
          

    
    return <CartContext.Provider value={{addToCart,getCartItems,updateProduct,deleteCart,checkOut,clearCart,cartItems,loading,currentId,animationCart}}>
        {children}
    </CartContext.Provider>
}
