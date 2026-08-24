"use client";

import { Console } from "console";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";


type CartProduct = {
    id: number;
    name: string;
    price: number;
    image: string;
};

type CartItem = CartProduct & {
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

export function CartProvider({children} : {children: ReactNode}) {
    console.log(" 🔥 CART PROVIDER RENDERED ");

    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("🔥🔥 CART AFTER UPDATE:", cart);
    },[cart]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

        setIsLoaded(true);
    },[]);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem("cart",JSON.stringify(cart));
    },[cart,isLoaded]);

    function addToCart(product: CartProduct) {
        console.log("🔥🔥 ADD TO CART FUNCTION CALLED", product)
        
        setCart((currentCart) => {
            const existingItem = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentCart.map((item) => 
                    item.id === product.id
                        ?{
                            ...item,
                            quantity: item.quantity + 1,
                        }
                      : item  
                );
            }

            console.log("🔥 CURRENT CART:", currentCart);

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    }

    function removeFromCart(id: number) {
        setCart((currentCart) => 
            currentCart.filter((item) => item.id !== id)
        );
    }

    function increaseQuantity(id: number) {
        setCart((currentCart) => 
            currentCart.map((item) =>
                item.id === id
                    ?{
                        ...item,
                        quantity: item.quantity + 1,
                    }
                   : item 
            )
        );
    }

    function decreaseQuantity(id: number) {
        setCart((currentCart) => 
            currentCart
            .map((item)=>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity -1,
                  }
                : item  
            )
            .filter((item) => item.quantity > 0)
        );
    }

    function clearCart() {
        setCart([]);
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "usecart must be used inside CartProvider"
        );
    }

    return context;
}

