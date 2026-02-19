import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/";
import { Header } from "../Header/";
import { Main } from "../Main";
import styles from "./layout.module.css";

export function Layout() {
	return (
		<div className={styles.parentElement}>
			<Header isWhiteBg />
			<Main>
				<Outlet></Outlet>
			</Main>
			<div className={styles.spacer}>

			</div>
			<Footer></Footer>
		</div>
	);
}
