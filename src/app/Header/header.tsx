import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./header.module.css";

export function Header(props: { className?: string, isWhiteBg: boolean }) {
	const { className, isWhiteBg } = props;

	return (
		<header className={`${styles.header} ${className} ${isWhiteBg ? styles.whiteBg : styles.darkBg}`}>
			<div className={styles.headerBlock}>
				<div className={styles.leftBlock}>
					<Link to="/catalog/" className={styles.link}>
						КАТАЛОГ
					</Link>
					<Link to="/about/" className={styles.link}>
						ПРО НАС
					</Link>
					<Link to="/contacts/" className={styles.link}>
						КОНТАКИ
					</Link>
				</div>

				<img src={IMAGES.logo} className={styles.logo} />
				<div className={styles.rightBlock}>
					<ICONS.cart className={styles.miniLogo} />
					<ICONS.user className={styles.miniLogo} />
				</div>
			</div>
		</header>
	);
}
