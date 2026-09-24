"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";


type CartProduct = {
    id: number;
    name: string;
    price: number;
    image: string;
    stock: number;
};

type CartItem = CartProduct & {
    variantId: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: CartProduct, quantity?: number) => Promise<void>;
    removeFromCart: (id: number) => Promise<void>;
    increaseQuantity: (id: number) => Promise<void>;
    decreaseQuantity: (id: number) => Promise<void>;
    clearCart: () => Promise<void>;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

export function CartProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadCart() {
            try {
                const response = await fetch("/api/cart");

                if (response.status === 401) {
                    setCart([]);
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    console.error(data.error);
                    return;
                }

                const items: CartItem[] = data.items.map(
                    (item: {
                        quantity: number;
                        variant: {
                            id: number;
                            price: string;
                            stock: number;
                        };
                        product: {
                            id: number;
                            title: string;
                            // price: string;
                            image: string;
                            // stock: string;
                        };
                    }) => ({
                        id: item.product.id,
                        variantId: item.variant.id,
                        name: item.product.title,
                        price: Number(item.variant.price),
                        image: item.product.image,
                        stock: item.variant.stock,
                        quantity: item.quantity,
                    })
                );

                setCart(items);
            } catch (error) {
                console.error("Failed to load cart:", error);
            } finally {
                setIsLoaded(true);
            }
        }

        loadCart();
    }, []);

    async function addToCart(product: CartProduct, quantity = 1) {
        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error);
                return;
            }

            const items: CartItem[] = data.items.map(
                (item: {
                    quantity: number;
                    variant: {
                        id: number;
                        price: string;
                        stock: number;
                    }
                    product: {
                        id: number;
                        title: string;
                        // price: string;
                        image: string;
                        // stock: number;
                    };
                }) => ({
                    id: item.product.id,
                    variantId: item.variant.id,
                    name: item.product.title,
                    price: Number(item.variant.price),
                    image: item.product.image,
                    stock: item.variant.stock,
                    quantity: item.quantity,
                })
            );

            setCart(items);
        } catch(error) {
             console.error("Failed to add to cart:", error);
        }
    }

    async function removeFromCart(variantId: number) {
        try {
            const response = await fetch("/api/cart", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    variantId,
                }), 
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error);
                return;
            }

            const items: CartItem[] = data.items.map(
                (item: {
                    quantity: number;
                    variant: {
                        id: number;
                        price: string;
                        stock: number;
                    }
                    product: {
                        id: number;
                        title: string;
                        // price: string;
                        image: string;
                        // stock: number;
                    };
                }) => ({
                    id: item.product.id,
                    variantId: item.variant.id,
                    name: item.product.title,
                    price: Number(item.variant.price),
                    image: item.product.image,
                    stock: item.variant.stock,
                    quantity: item.quantity,
                })
            );

            setCart(items);
        } catch(error) {
            console.error("Failed to remove cart item:", error);
        }
    }


    async function updateQuantity(variantId: number, quantity: number) {
        try {
            const response = await fetch("/api/cart", {
               method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    variantId,
                    quantity,
                }), 
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error);
                return;
            }

            const items: CartItem[] = data.items.map(
                (item: {
                    quantity: number;
                    variant: {
                        id: number;
                        price: string;
                        stock: number;
                    }
                    product: {
                        id: number;
                        title: string;
                        // price: string;
                        image: string;
                        // stock: number;
                    };
                }) => ({
                    id: item.product.id,
                    variantId: item.variant.id,
                    name: item.product.title,
                    price: Number(item.variant.price),
                    image: item.product.image,
                    stock: item.variant.stock,
                    quantity: item.quantity,
                })
            );

            setCart(items);
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    }

    async function increaseQuantity(variantId: number) {
        const item = cart.find((item) => item.variantId === variantId);

        if (!item || item.quantity >= item.stock ) {
            return;
        }

        await updateQuantity(variantId, item.quantity + 1);
    }

    async function decreaseQuantity(variantId: number) {
        const item = cart.find((item) => item.variantId === variantId );

        if (!item) {
            return;
        }

        if (item.quantity <= 1) {
            await removeFromCart(variantId);
            return;
        }

        await updateQuantity(variantId, item.quantity - 1);
    }

       async function clearCart() {
        try {
            const response = await fetch("/api/cart", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clearAll: true,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                console.error(data.error);
                return;
            }

            setCart([]);
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
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
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}