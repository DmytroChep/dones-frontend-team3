import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { Main } from "../Main";
import { Header } from "../Header/";
import { Footer } from "../Footer/"

export function Layout() {
	return (
		<div className={styles.parentElement}>	
			<Header/>
            <Main>
                <Outlet></Outlet>
            </Main>
			<Footer></Footer>
		</div>
	);
}