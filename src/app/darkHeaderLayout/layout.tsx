import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/";
import { Header } from "../Header/";
import { Main } from "../Main";
import styles from "./layout.module.css";
import { useEffect } from "react";

export function DarkHeaderLayout() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])
	return (
		<div className={styles.parentElement}>
			<Header isWhiteBg={false} />
			<Main>
				<Outlet></Outlet>
			</Main>
			<div className={styles.spacer}>

			</div>
			<Footer></Footer>
		</div>
	);
}
