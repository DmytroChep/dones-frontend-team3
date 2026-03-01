import { Button } from "../../shared/button";
import styles from "./productPage.module.css";
export function SuccessOrder() {
	return (
		<div className={styles.main}>
			<div className={styles.successOrderDiv}>
				<p className={styles.SuccessText}>УСПІХ!</p>
				<p className={styles.descriptionSuccess}>
					Ваше замовлення №21718 прийнято та відправлено на обробку<br /><br />. Ми
					сповістимо Вас щойно замовлення буде відправлено. <br />Дякуємо за довіру!
				</p>
                <Button navigateTo="/" textClassName={styles.buttonSuccessText} className={styles.buttonSuccess}>НА ГОЛОВНУ</Button>
			</div>
		</div>
	);
}
