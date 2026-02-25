import { useEffect, useState } from "react";

export function useSendEmalCode() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);



    const sendCode = async (gmail: string) => {
        try {
            setIsLoaded(false);

            await fetch(
                `http://127.0.0.1:3000/user/sendCode?gmail=${gmail}`,
            );

        } catch (error) {
            console.error("Failed to fetch Products:", error);
        } finally {
            setIsLoaded(true);
        }
    }



    return { isLoaded, sendCode };
}
