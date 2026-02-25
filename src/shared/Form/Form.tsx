import { useContext, useState, MouseEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import styles from "./Form.module.css";
import type { ISignInForm, ISignUpForm } from "./Form.types";
import { ICONS } from "../icons";
import { useSendEmalCode } from "../../hooks/use-send-email-code";
import { useIsCodeExists } from "../../hooks/use-is-code-exists";
import { useUpdateUserData } from "../../hooks/use-update-user-data";
import { useUpdatePassword } from "../../hooks/use-update-password";

interface IFormProps {
	variant: "signIn" | "signUp";
	resetStep: number;
	setResetStep: (step: number) => void;
}

const EMAIL_STORAGE_KEY = "reset_password_email";

export function Form({ variant, resetStep, setResetStep }: IFormProps) {
	const [searchParams] = useSearchParams();
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
		setError,
	} = useForm<ISignUpForm & { resetCode?: string }>();

	const navigate = useNavigate();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);
	const [isCodeSent, setIsCodeSent] = useState(false);

	const passwordValue = watch("password");
	const userEmail = watch("email");

	const { sendCode } = useSendEmalCode();
	const { checkCode } = useIsCodeExists();
	const updateUserData = useUpdateUserData();
	const UserContextData = useContext(UserContext);
	const { updatePassword } = useUpdatePassword();

	// --- ЭФФЕКТ ВОССТАНОВЛЕНИЯ ДАННЫХ ПРИ ПЕРЕЗАГРУЗКЕ ---
	useEffect(() => {
		const code = searchParams.get("code");
		const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);

		if (code) {
			setResetStep(2); // Сразу на шаг ввода/проверки кода
			setValue("resetCode", code);

			if (savedEmail) {
				setValue("email", savedEmail); // Возвращаем email в состояние формы
			}
		}
	}, [searchParams, setResetStep, setValue]);

	const handleTogglePassword = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleToggleConfirm = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setIsConfirmVisible(!isConfirmVisible);
	};

	async function onSubmit(data: ISignUpForm & { resetCode?: string }) {
		if (resetStep > 0) {
			try {
				if (resetStep === 1) {
					if (!isCodeSent) {
						// Сохраняем email перед отправкой кода
						await sendCode(data.email);
						localStorage.setItem(EMAIL_STORAGE_KEY, data.email);
						setIsCodeSent(true);
					} else {
						setResetStep(2);
						setIsCodeSent(false);
					}
				} else if (resetStep === 2) {
					// Проверка кода
					const isValid = await checkCode(Number(data.resetCode));
					if (isValid) {
						setResetStep(3);
					} else {
						setError("resetCode", { message: "Невірний або прострочений код" });
					}
				} else if (resetStep === 3) {
					await updatePassword({
						email: data.email,
						password: data.password,
					});

					// Очистка
					localStorage.removeItem(EMAIL_STORAGE_KEY);
					setResetStep(0);
					navigate(window.location.pathname, { replace: true });
				}
			} catch (err) {
				setError("root", { message: "Щось пішло не так. Спробуйте пізніше." });
			}
			return;
		}

		if (!UserContextData) return;
		const { signUp, signIn } = UserContextData;

		try {
			if (variant === "signUp") {
				const { confirmPassword, ...dataToSubmit } = data;
				const result = await signUp({ isAdmin: false, ...dataToSubmit });
				if (result?.split(".").length === 3) return navigate("/profile/");
			} else {
				console.log(data);
				const result = await signIn({
					email: data.email,
					password: data.password,
				} as ISignInForm);
				if (result?.split(".").length === 3) return navigate("/profile/");
			}
		} catch (err) {
			setError("root", { message: "Невірний логін або пароль" });
		}
	}

	const PasswordIcon = isPasswordVisible ? ICONS.visible : ICONS.invisible;
	const ConfirmIcon = isConfirmVisible ? ICONS.visible : ICONS.invisible;

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
			noValidate
			onClick={(e) => e.stopPropagation()}
		>
			<div className={styles.fields}>
				{resetStep === 1 && (
					<div className={styles.field}>
						{!isCodeSent ? (
							<>
								<p className={styles.fieldTitle}>
									Введіть Email для відновлення
								</p>
								<div className={styles.input}>
									<input
										placeholder="example@mail.com"
										className={`${errors.email ? styles.inputError : styles.fieldInput}`}
										{...register("email", { required: "Вкажіть вашу пошту" })}
									/>
								</div>
							</>
						) : (
							<div style={{ textAlign: "center", padding: "10px 0" }}>
								<p className={styles.fieldTitle} style={{ color: "green" }}>
									✔ Лист надіслано!
								</p>
								<p style={{ fontSize: "14px" }}>
									Ми відправили код на <b>{userEmail}</b>.<br />
									Перевірте пошту и натисніть "Далі".
								</p>
							</div>
						)}
					</div>
				)}

				{resetStep === 2 && (
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Код підтвердження</p>
						<div className={styles.input}>
							<input
								placeholder="000000"
								className={`${errors.resetCode ? styles.inputError : styles.fieldInput}`}
								{...register("resetCode", { required: "Введіть код з листа" })}
							/>
						</div>
						{errors.resetCode && (
							<p className={styles.error}>{errors.resetCode.message}</p>
						)}
					</div>
				)}

				{resetStep === 3 && (
					<div className={styles.field}>
						<p className={styles.fieldTitle}>Придумайте новий пароль</p>
						<div className={styles.input}>
							<input
								type={isPasswordVisible ? "text" : "password"}
								placeholder="Мін. 6 символів"
								className={`${errors.password ? styles.inputError : styles.fieldInput}`}
								{...register("password", {
									required: "Це поле обов'язкове",
									minLength: 6,
								})}
							/>
							<PasswordIcon
								className={styles.iconInvisible}
								onClick={handleTogglePassword}
							/>
						</div>
					</div>
				)}

				{resetStep === 0 && (
					<>
						{variant === "signUp" && (
							<div className={styles.field}>
								<p className={styles.fieldTitle}>Ім'я</p>
								<div className={styles.input}>
									<input
										placeholder="Ваше ім'я"
										className={`${errors.username ? styles.inputError : styles.fieldInput}`}
										{...register("username", { required: true })}
									/>
								</div>
							</div>
						)}

						<div className={styles.field}>
							<p className={styles.fieldTitle}>Email</p>
							<div className={styles.input}>
								<input
									placeholder="example@mail.com"
									type="email"
									className={`${errors.email ? styles.inputError : styles.fieldInput}`}
									{...register("email", { required: true })}
								/>
							</div>
						</div>

						<div className={styles.field}>
							<p className={styles.fieldTitle}>Пароль</p>
							<div className={styles.input}>
								<input
									placeholder="Введіть пароль"
									className={`${errors.password ? styles.inputError : styles.fieldInput}`}
									type={isPasswordVisible ? "text" : "password"}
									{...register("password", { required: true })}
								/>
								<PasswordIcon
									className={styles.iconInvisible}
									onClick={handleTogglePassword}
								/>
							</div>
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
											validate: (value) =>
												value === passwordValue || "Паролі не співпадають",
										})}
									/>
									<ConfirmIcon
										className={styles.iconInvisible}
										onClick={handleToggleConfirm}
									/>
								</div>
							</div>
						)}

						{variant === "signIn" && (
							<p
								className={styles.resetPassword}
								onClick={() => setResetStep(1)}
							>
								Забули пароль?
							</p>
						)}
					</>
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
					onClick={(e) => {
						e.stopPropagation();
						if (resetStep > 0) {
							setResetStep(0);
							setIsCodeSent(false);
							localStorage.removeItem(EMAIL_STORAGE_KEY); // Чистим при возврате
						} else {
							window.location.reload();
						}
					}}
				>
					{resetStep > 0 ? "НАЗАД" : "СКАСУВАТИ"}
				</button>
				<button type="submit" className={styles.submit}>
					{resetStep === 0
						? variant === "signUp"
							? "ЗАРЕЄСТРУВАТИСЯ"
							: "УВІЙТИ"
						: "ДАЛІ"}
				</button>
			</div>
		</form>
	);
}
