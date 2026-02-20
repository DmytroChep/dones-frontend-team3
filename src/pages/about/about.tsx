import { useEffect } from "react";
import { IMAGES } from "../../shared";
import styles from "./about.module.css";

export function About() {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])
	return (
		<div className={styles.about}>
			<div className={styles.firstBlock}>
				<div className={styles.aboutUsText}>
					<p className={styles.adoutUsTextHeader}>ПРО НАС</p>
					<p className={styles.adoutUsTextMain}>
						Ми — команда, яка об'єднана спільною метою: зробити передові
						технології доступними для кожного, хто потребує точності, безпеки та
						інновацій. <br />З 2022 року ми спеціалізуємось на постачанні дронів
						і тепловізорів для професійного, цивільного та волонтерського
						використання.
					</p>
				</div>
				<img src={IMAGES.aboutImage1} className={styles.imageBlock1} />
			</div>
			<div className={styles.secondAndThirdBlock}>
				<div className={styles.smallBlocksText}>
					<p className={styles.smallBlocksTextHeader}>НАША МІСІЯ</p>
					<p className={styles.smallBlocksTextMain}>
						Допомагати тим, хто стоїть на передовій — у прямому й переносному
						сенсі.
						<br /> Ми обираємо тільки надійну техніку, яку перевіряємо самі.
						Наша мета — якість, простота, і підтримка на кожному етапі: від
						покупки до використання.
					</p>
				</div>
				<img src={IMAGES.aboutImage2} className={styles.imageBlock2} />
			</div>
			<div className={styles.secondAndThirdBlock}>
				<img src={IMAGES.aboutImage3} className={styles.imageBlock2} />
				<div className={styles.smallBlocksText}>
					<p className={styles.smallBlocksTextHeader}>
						КОМАНДА, ЯКИЙ МОЖНА ДОВІРЯТИ
					</p>
					<p className={styles.smallBlocksTextMain}>
						Ми — не просто магазин. Ми — фахівці, які самі працюють із цією
						технікою й консультують з досвіду. Засновники проєкту — волонтери,
						військові та IT-спеціалісти, які об'єднали зусилля задля важливої
						справи.
					</p>
				</div>
			</div>
		</div>
	);
}
