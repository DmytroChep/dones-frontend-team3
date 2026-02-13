import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./header.module.css";
import { useState } from "react"; // Добавь это


export function Header(props: { className?: string, isWhiteBg: boolean }) {
    const { className, isWhiteBg } = props;
    const [isOpen, setIsOpen] = useState(false); // Состояние для меню

    return (
        <header className={`${styles.header} ${className} ${isWhiteBg ? styles.whiteBg : styles.darkBg}`}>
            <div className={styles.headerBlock}>
                <div className={styles.burgerBtn} onClick={() => setIsOpen(!isOpen)}>
					<ICONS.burger className={styles.iconBurger}/>
                </div>

                <div className={`${styles.leftBlock} ${isOpen ? styles.activeMenu : ""}`}>
                    <Link to="/catalog/" className={styles.link}>КАТАЛОГ</Link>
                    <Link to="/about/" className={styles.link}>ПРО НАС</Link>
                    <Link to="/contacts/" className={styles.link}>КОНТАКТИ</Link>
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