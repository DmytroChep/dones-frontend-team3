import { Link } from "react-router-dom";
import { IMAGES } from "../../shared";
import styles from "./footer.module.css";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<img src={IMAGES.footer} alt="" className={styles.footerBg} />
			<div className={styles.footerInfo}>
				<div className={styles.infoBlock}>
					<div>
						<h1>1K+</h1>
					</div>
					<div>
						<p>Успішних відправок</p>
					</div>
				</div>
				<div className={styles.infoBlock}>
					<div>
						<h1>1.5K+</h1>
					</div>
					<div>
						<p>Задоволених клієнтів</p>
					</div>
				</div>
				<div className={styles.infoBlock}>
					<div>
						<h1>24/7</h1>
					</div>
					<div>
						<p>Підтримка клієнтів</p>
					</div>
				</div>
			</div>
			<div className={styles.footerLinks}>
				<Link to="/catalog/" className={styles.link}>
					КАТАЛОГ
				</Link>
				<Link to="/about/" className={styles.link}>
					ПРО НАС
				</Link>
				<Link to="/contacts/" className={styles.link}>
					КОНТАКИ
				</Link>
				<Link to="/cart/" className={styles.link}>
					КОШИК
				</Link>
				<Link to="/profile/" className={styles.link}>
					КАБІНЕТ
				</Link>
			</div>
		</footer>
	);
}
