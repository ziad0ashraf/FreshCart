import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
    const headers = {
        token: localStorage.getItem('user-token'),
    };

    const [animationWishlist, setAnimationWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistProducts, setWishlistProducts] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(null);

    async function AddToWishlist(productId) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{ productId },{ headers }
            );
            setWishlistProducts(data?.data); 
            toast('Item add to wishlist!',
                {
                    icon:<FaHeart className='text-red-600' />
                }
            )
            setAnimationWishlist(true);
            setTimeout(() => setAnimationWishlist(false), 1500);
            GetWishlist()
        } catch (error) {
            console.error(error);
            toast.error("Failed to add item to wishlist");
        }
    }

    async function GetWishlist() {
        try {
            if (localStorage.getItem('user-token')) {
                setIsLoading(true);
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers });
                // console.log(data);
                setWishlistProducts(data?.data);
                setWishlistCount(data.count)          
                setIsLoading(false); 
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    async function deleteWishlist(productId) {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            GetWishlist();
            toast('Item deleted from wishlist!',{icon:<FaHeartBroken className='text-red-600' />}
            )
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete item from wishlist");
        }
    }

    useEffect(() => {
        GetWishlist()
    }, [])
    


    return (
        <WishlistContext.Provider value={{ AddToWishlist, deleteWishlist, GetWishlist ,wishlistCount, wishlistProducts, animationWishlist, isLoading }}>
            {children}
        </WishlistContext.Provider>
    );
}
