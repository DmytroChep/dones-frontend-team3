import { Header } from "../../app/Header";
import { IMAGES } from "../../shared";
import styles from "./not-found.module.css";

export function NotFound() {
	return (
		<div className={styles.notFound}>
			<div className={styles.centerElement}>
				<p className={styles.notFoundText}>Мабуть, ви загубились...</p>
				<p className={styles.notFoundTextSmall}>таку сторнку не знайдено</p>
				<img src={IMAGES.drone} className={styles.droneImage} />
			</div>
			<div className={styles.oval}></div>
		</div>
	);
}
