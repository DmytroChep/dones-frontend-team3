import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/";
import { Header } from "../Header/";
import { Main } from "../Main";
import styles from "./layout.module.css";

export function DarkHeaderLayout() {
	return (
		<div className={styles.parentElement}>
			<Header isWhiteBg={false}/>
			<Main>
				<Outlet></Outlet>
			</Main>
			<Footer></Footer>
		</div>
	);
}
