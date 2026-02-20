import { useEffect } from "react";
import { IMAGES } from "../../shared";
import styles from "./not-found.module.css";

export function NotFound() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])
	return (
		<div className={styles.notFound}>
			<div className={styles.centerElement}>
				<p className={styles.notFoundText}>Мабуть, ви загубились...</p>
				<p className={styles.notFoundTextSmall}>таку сторінку не знайдено</p>
				<img src={IMAGES.drone} className={styles.droneImage} alt="404 Drone" />
			</div>
			<div className={styles.oval}></div>
		</div>
	);
}
