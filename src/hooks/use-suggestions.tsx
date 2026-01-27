import { useEffect, useState } from "react";
import { IProductsSuggHeaders, IProduct } from "../assets/types";


export function useProductsSugg(productsSuggHeaders: IProductsSuggHeaders) {
    const [Products, setProducts] = useState<IProduct[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    
    const {typeOfSuggestion, take} = productsSuggHeaders



    useEffect(() => {
        async function getAllProducts() {
            try {
                setIsLoaded(false)
                if (take){
                  if (typeOfSuggestion === "new"){
                    const response = await fetch(`http://127.0.0.1:3000/products/suggestions?take=${take}&new=true`);
                    const data = await response.json();
                    setProducts(data.reverse()); 
                  }
                  else if (typeOfSuggestion === "popular"){
                    const response = await fetch(`http://127.0.0.1:3000/products/suggestions?take=${take}&popular=true`);
                    const data = await response.json();
                    setProducts(data.reverse()); 
                  }
                  else{
                    const response = await fetch(`http://127.0.0.1:3000/products/suggestions?take=${take}`);
                    const data = await response.json();
                    setProducts(data.reverse()); 
                    console.log(data)
                  }
                }
                

                if (typeOfSuggestion === "new"){
                  const response = await fetch(`http://127.0.0.1:3000/products/suggestions?new=true`);
                  const data = await response.json();
                  setProducts(data.reverse()); 
                }
                else if (typeOfSuggestion === "popular"){
                  const response = await fetch(`http://127.0.0.1:3000/products/suggestions?popular=true`);
                  const data = await response.json();
                  setProducts(data.reverse()); 
                }
                else{
                  const response = await fetch(`http://127.0.0.1:3000/products/suggestions`);
                  const data = await response.json();
                  setProducts(data.reverse()); 
                } 
                            

            } catch (error) {
                console.error("Failed to fetch Products:", error);
            } finally{
                setIsLoaded(true)
            }
        }
        getAllProducts();
    }, []);

    return {Products, isLoaded};
}