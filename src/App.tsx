import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/not-found/not-found";
import { Layout } from "./app/Layout";


export function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/about/"/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

