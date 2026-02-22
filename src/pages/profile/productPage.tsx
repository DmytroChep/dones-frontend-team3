import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import styles from "./productPage.module.css";
import { useNavigate } from "react-router-dom";

export function Profile() {
	const cotnextData = useContext(UserContext);
	const [choosedOption, setChoosedOption] = useState<
		"userData" | "orders" | "deliveries"
	>("userData");
	const navigate = useNavigate()
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])
	if (!cotnextData) {
		return null;
	}

	const { user, logout } = cotnextData;



	return (
		<div className={styles.main}>
			<div className={styles.profileLinks}>
				<p className={styles.linksTitle}>ОСОБИСТИЙ КАБІНЕТ</p>
				<p
					className={`${choosedOption === "userData" ? styles.choosedOption : styles.link}`}
					onClick={() => {
						setChoosedOption("userData");
					}}
				>
					КОНТАКТНІ ДАНІ
				</p>
				<p
					className={`${choosedOption === "orders" ? styles.choosedOption : styles.link}`}
					onClick={() => {
						setChoosedOption("orders");
					}}
				>
					МОЇ ЗАМОВЛЕННЯ
				</p>
				<p
					className={`${choosedOption === "deliveries" ? styles.choosedOption : styles.link}`}
					onClick={() => {
						setChoosedOption("deliveries");
					}}
				>
					АДРЕСА ДОСТАВКИ
				</p>
				<hr className={styles.hr} />
				<p className={`${styles.link}`} onClick={() => {
					logout()
					navigate("/")
					}}>ВИЙТИ</p>
			</div>

			<div
				className={
					choosedOption === "userData" ? styles.userData : styles.hidden
				}
			>
				<p className={styles.userDataTitle}>Контактні дані</p>
				<div className={styles.fieldsContactData}>
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Прізвище</p>
						<div className={styles.input}>
							<input
								placeholder="Ваше прізвище"
								className={`${styles.fieldInput}`}
							/>
						</div>
					</div>
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Ім'я</p>
						<div className={styles.input}>
							<input
								placeholder="Ваше Ім'я"
								className={`${styles.fieldInput}`}
							/>
						</div>
					</div>
					<div className={styles.field}>
						<p className={styles.fieldTitle}>По батькові</p>
						<div className={styles.input}>
							<input
								placeholder="По батькові"
								className={`${styles.fieldInput}`}
							/>
						</div>
					</div>
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Дата народження</p>
						<div className={styles.input}>
							<input
								placeholder="DD / MM / YYYY"
								className={`${styles.fieldInput}`}
							/>
						</div>
					</div>
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Телефон</p>
						<div className={styles.input}>
							<input
								placeholder="+38 0"
								className={`${styles.fieldInput}`}
							/>
						</div>
					</div>
					<div className={styles.field}>
						<p className={styles.fieldTitle}>E-mail</p>
						<div className={styles.input}>
							<input
								placeholder="Ваш E-mail"
								className={`${styles.fieldInput}`}
								value={user?.email}
							/>
						</div>
					</div>
				</div>
				<button className={styles.button} type="submit">
					ЗБЕРЕГТИ ЗМІНИ
				</button>
			</div>
			<div
				className={choosedOption === "orders" ? styles.orders : styles.hidden}
			></div>
			<div
				className={
					choosedOption === "deliveries" ? styles.deliveries : styles.hidden
				}
			></div>
		</div>
	);
}
