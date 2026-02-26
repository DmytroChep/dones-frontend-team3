import { createContext, type ReactNode, useEffect, useState } from "react";
import type { ICartProduct } from "../assets/types/backend-types";

interface ICartContext {
    products: ICartProduct[]
    addToCart: (product: ICartProduct) => void;
    removeProductFromCart: (productId: number) => void;
    incProductQuantity: (productId: number) => void;
    decProductQuantity: (productId: number) => void;
}

interface ICartContextProviderProps {
    children: ReactNode;
}

export const CartContext = createContext<ICartContext | null>(null);

export function CartContextProvider(props: ICartContextProviderProps) {
    const { children } = props;
    const [products, setProducts] = useState<ICartProduct[]>([])

    function addToCart(product:ICartProduct) {
        const productsWithNewProducts = [...products, product]
        setProducts(productsWithNewProducts)
        localStorage.setItem("cartProducts", JSON.stringify(productsWithNewProducts))
    }

    function removeProductFromCart(productId:number) {
        const productsWithoutchoosedProduct = products.filter((product) => {
            return product.id !== productId
        })
        setProducts(productsWithoutchoosedProduct)
        localStorage.setItem("cartProducts", JSON.stringify(productsWithoutchoosedProduct))
    }

    function incProductQuantity(productId: number) {
        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });

        console.log(updatedProducts);
        setProducts(updatedProducts)
        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts))
    }

    function decProductQuantity(productId: number) {
        const updatedProducts = products.map(product => {
            if (product.id === productId && product.quantity > 1) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });

        console.log(updatedProducts);
        setProducts(updatedProducts)
        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts))
    }

    useEffect(() => {
        const cartProducts = localStorage.getItem("cartProducts")
        if (cartProducts){
            setProducts(JSON.parse(cartProducts))
        } else{
            localStorage.setItem("cartProducts", "[]")
        }
    }, [])




    return (
        <CartContext.Provider value={{ products, addToCart, removeProductFromCart, incProductQuantity, decProductQuantity }}>
            {children}
        </CartContext.Provider>
    );
}
