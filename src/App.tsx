import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/not-found/not-found";
import { Layout } from "./app/Layout";
import { About } from "./pages/about";


export function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/about/" element = {<About/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

