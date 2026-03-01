import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./header.module.css";


export function HeaderOrder(props: { className?: string; isWhiteBg: boolean }) {
	const { className, isWhiteBg } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const navigate = useNavigate();





	return (
		<header
			className={`${styles.header} ${className} ${isWhiteBg ? styles.whiteBg : styles.darkBg}`}
		>
			<div className={styles.headerBlock}>
				<button className={styles.burgerBtn} type="button">
					<ICONS.burger
						className={styles.iconBurger}
						onClick={() => setIsOpen(!isOpen)}
					/>
				</button>

				<div
					className={`${styles.leftBlock} ${isOpen ? styles.activeMenu : ""}`}
				>
					<Link to="/catalog/" className={styles.link}>
						ПРОДОВЖИТИ ПОКУПКИ
					</Link>

				</div>

				<img
					src={IMAGES.logo}
					className={styles.logo}
					alt="logo"
					onClick={() => navigate("/")}
				/>

				<div className={styles.rightBlock}>
				</div>
			</div>
		</header>
	);
}
