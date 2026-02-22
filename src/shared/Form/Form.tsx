import { useContext, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import styles from "./Form.module.css";
import type { IFormData, ISignInForm, ISignUpForm } from "./Form.types";
import { ICONS } from "../icons";

export function Form(props: { variant: "signIn" | "signUp" }) {
	const { variant } = props;

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
		setError,
	} = useForm<ISignUpForm>();

	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const passwordValue = watch("password");

	const UserContextData = useContext(UserContext);
	if (!UserContextData) return null;
	const { signUp, signIn } = UserContextData;

	const handleTogglePassword = (event: MouseEvent) => {
		event.preventDefault();
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleToggleConfirm = (event: MouseEvent) => {
		event.preventDefault();
		setIsConfirmVisible(!isConfirmVisible);
	};

	async function onSubmit(data: ISignUpForm) {
		try {
			if (variant === "signUp") {
				const { confirmPassword, ...dataToSubmit } = data;

				const result = await signUp({isAdmin: false, ...dataToSubmit});

				

				navigate("/profile/")
			} else {
				const result = await signIn({
					email: data.email,
					password: data.password,
				} as ISignInForm);


				navigate("/profile/")
			}
		} catch (err) {
			console.error(err);
			setError("root", { message: "Помилка сервера" });
		}
	}

	const PasswordIcon = isPasswordVisible ? ICONS.visible : ICONS.invisible;
	const ConfirmIcon = isConfirmVisible ? ICONS.visible : ICONS.invisible;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
			<div className={styles.fields}>
				{variant === "signUp" && (
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Ім'я</p>
						<div className={styles.input}>
							<input
								placeholder="Введіть ім'я"
								className={`${errors.username ? styles.inputError : styles.fieldInput}`}
								{...register("username", { required: "Це поле обов'язкове" })}
							/>
						</div>
						{errors.username && (
							<p className={styles.error}>{errors.username.message}</p>
						)}
					</div>
				)}

				<div className={styles.field}>
					<p className={styles.fieldTitle}>Email</p>
					<div className={styles.input}>
						<input
							placeholder="Введіть email"
							type="email"
							className={`${errors.email ? styles.inputError : styles.fieldInput}`}
							{...register("email", {
								required: "Це поле обов'язкове",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Невірний формат",
								},
							})}
						/>
					</div>
					{errors.email && (
						<p className={styles.error}>{errors.email.message}</p>
					)}
				</div>

				<div className={styles.field}>
					<p className={styles.fieldTitle}>Пароль</p>
					<div className={styles.input}>
						<input
							placeholder="Введіть пароль"
							className={`${errors.password ? styles.inputError : styles.fieldInput}`}
							type={isPasswordVisible ? "text" : "password"}
							{...register("password", { required: "Це поле обов'язкове" })}
						/>
						<PasswordIcon
							className={styles.iconInvisible}
							onClick={handleTogglePassword}
						/>
					</div>
					{errors.password && (
						<p className={styles.error}>{errors.password.message}</p>
					)}
				</div>

				{variant === "signUp" && (
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Підтвердження пароля</p>
						<div className={styles.input}>
							<input
								placeholder="Повторіть пароль"
								className={`${errors.confirmPassword ? styles.inputError : styles.fieldInput}`}
								type={isConfirmVisible ? "text" : "password"}
								{...register("confirmPassword", {
									required: "Це поле обов'язкове",
									validate: (value) =>
										value === passwordValue || "Паролі не співпадають",
								})}
							/>
							<ConfirmIcon
								className={styles.iconInvisible}
								onClick={handleToggleConfirm}
							/>
						</div>
						{errors.confirmPassword && (
							<p className={styles.error}>{errors.confirmPassword.message}</p>
						)}
					</div>
				)}

				{errors.root && (
					<p className={styles.error} style={{ textAlign: "center" }}>
						{errors.root.message}
					</p>
				)}
			</div>

			<div className={styles.buttons}>
				<button
					type="button"
					className={styles.cancel}
					onClick={() => {
						window.location.reload()
					}}
				>
					СКАСУВАТИ
				</button>
				<button type="submit" className={styles.submit} >
					{variant === "signUp" ? "ЗАРЕЄСТРУВАТИСЯ" : "УВІЙТИ"}
				</button>
			</div>
		</form>
	);
}
