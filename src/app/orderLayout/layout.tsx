import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/";
import { Main } from "../Main";
import styles from "./layout.module.css";
import { useEffect } from "react";
import { HeaderOrder } from "../HeaderOrder";

export function LayoutOrder() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])
	return (
		<div className={styles.parentElement}>
			<HeaderOrder isWhiteBg />
			<Main>
				<Outlet></Outlet>
			</Main>
			<div className={styles.spacer}>

			</div>
			<Footer></Footer>
		</div>
	);
}
