import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/not-found/not-found";
import { Layout } from "./app/Layout";
import { About } from "./pages/about";
import { AppRoutes } from "./App-routes";


export function App(){
    return(
        <AppRoutes />
    )
}

