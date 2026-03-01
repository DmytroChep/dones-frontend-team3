import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Main } from "../Main";
import styles from "./layout.module.css";
import { useEffect } from "react";
import { IMAGES } from "../../shared";
import { HeaderOrder } from "../HeaderOrder";

export function DarkHeaderAndChangedFooterLayout() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])
	
	return (
		<div className={styles.parentElement}>
			<HeaderOrder isWhiteBg={false} />
			<div className={styles.spacer}></div>
			<Main>
				<Outlet></Outlet>
			</Main>
			<img src={IMAGES.altFooter} className={styles.altFooter} />
		</div>
	);
}
