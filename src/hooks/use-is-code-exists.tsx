import { useEffect, useState } from "react";

export function useIsCodeExists() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);



    const checkCode = async (code: number) => {
        try {
            setIsLoaded(false);

            const response = await fetch(
                `http://127.0.0.1:3000/user/isCodeExists?code=${code}`,
            );
            const data = await response.json()
            return data

        } catch (error) {
            console.error("Failed to fetch Products:", error);
        } finally {
            setIsLoaded(true);
        }
    }



    return { isLoaded, checkCode };
}
