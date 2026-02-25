import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import styles from "./productPage.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IUpdateuser } from "../../assets/types/hooks/update-user-types";
import { useUpdateUserData } from "../../hooks/use-update-user-data";

export function Profile() {
	const contextData = useContext(UserContext);
	const user = contextData?.user;
	const logout = contextData?.logout;
	const navigate = useNavigate();

	const [choosedOption, setChoosedOption] = useState<
		"userData" | "orders" | "deliveries"
	>("userData");

	
	const userDataHookData = useUpdateUserData()


	
	const { register, handleSubmit } = useForm<IUpdateuser>({
		values: {
			surname: user?.surname || "",
			name: user?.name || "",
			middleName: user?.middleName || "",
			birthday: user?.birthday || "",
			phoneNumber: user?.phoneNumber || "",
			email: user?.email || "",
		},
	});
	console.log(user)

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	if (!contextData) {
		return null;
	}

	if (!userDataHookData){
		return null
	}

	const {update} = userDataHookData

	const onSubmit = (data: IUpdateuser) => {
		const filteredData = Object.fromEntries(
			Object.entries(data).filter(
				([_, value]) => value && String(value).trim() !== "",
			),
		);
		console.log("Filtered data:", filteredData);
		update(filteredData)
	};

	return (
		<div className={styles.main}>
			<div className={styles.profileLinks}>
				<p className={styles.linksTitle}>ОСОБИСТИЙ КАБІНЕТ</p>
				<p
					className={`${choosedOption === "userData" ? styles.choosedOption : styles.link}`}
					onClick={() => setChoosedOption("userData")}
				>
					КОНТАКТНІ ДАНІ
				</p>
				<p
					className={`${choosedOption === "orders" ? styles.choosedOption : styles.link}`}
					onClick={() => setChoosedOption("orders")}
				>
					МОЇ ЗАМОВЛЕННЯ
				</p>
				<p
					className={`${choosedOption === "deliveries" ? styles.choosedOption : styles.link}`}
					onClick={() => setChoosedOption("deliveries")}
				>
					АДРЕСА ДОСТАВКИ
				</p>
				<hr className={styles.hr} />
				<p
					className={`${styles.link}`}
					onClick={() => {
						logout?.();
						navigate("/");
					}}
				>
					ВИЙТИ
				</p>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
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
								{...register("surname")}
								placeholder="Ваше прізвище"
								className={styles.fieldInput}
							/>
						</div>
					</div>

					<div className={styles.field}>
						<p className={styles.fieldTitle}>Ім'я</p>
						<div className={styles.input}>
							<input
								{...register("name")}
								placeholder="Ваше Ім'я"
								className={styles.fieldInput}
							/>
						</div>
					</div>

					<div className={styles.field}>
						<p className={styles.fieldTitle}>По батькові</p>
						<div className={styles.input}>
							<input
								{...register("middleName")}
								placeholder="По батькові"
								className={styles.fieldInput}
							/>
						</div>
					</div>

					<div className={styles.field}>
						<p className={styles.fieldTitle}>Дата народження</p>
						<div className={styles.input}>
							<input
								{...register("birthday")}
								placeholder="DD / MM / YYYY"
								className={styles.fieldInput}
							/>
						</div>
					</div>

					<div className={styles.field}>
						<p className={styles.fieldTitle}>Телефон</p>
						<div className={styles.input}>
							<input
								{...register("phoneNumber")}
								placeholder="+38 0"
								className={styles.fieldInput}
							/>
						</div>
					</div>

					<div className={styles.field}>
						<p className={styles.fieldTitle}>E-mail</p>
						<div className={styles.input}>
							<input
								{...register("email")}
								placeholder="Ваш E-mail"
								className={styles.fieldInput}
							/>
						</div>
					</div>
				</div>

				<button className={styles.button} type="submit">
					ЗБЕРЕГТИ ЗМІНИ
				</button>
			</form>

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
