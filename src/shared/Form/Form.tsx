import { useContext, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import styles from "./Form.module.css";
import type { IFormData, ISignInForm, ISignUpForm } from "./Form.types";
import { ICONS } from "../icons";

interface IconProps {
	className?: string;
	onClick?: (event: MouseEvent<SVGSVGElement | HTMLButtonElement>) => void;
}

export function Form(props: { variant: "signIn" | "signUp" }) {
	const { variant } = props;
	const { handleSubmit, register } = useForm<IFormData>();
	const navigate = useNavigate();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmVisible, setIsConfirmVisible] = useState(false);

	const [PasswordIcon, setPasswordIcon] = useState<React.FC<IconProps>>(
		() => ICONS.invisible,
	);
	const [ConfirmPasswordIcon, setConfirmPasswordIcon] = useState<
		React.FC<IconProps>
	>(() => ICONS.invisible);

	const UserContextData = useContext(UserContext);
	if (!UserContextData) return null;
	const { signUp, signIn } = UserContextData;


	const handleTogglePassword = (
		event: MouseEvent<SVGSVGElement | HTMLButtonElement>,
	) => {
		event.preventDefault(); 
		event.stopPropagation(); 

		const nextState = !isPasswordVisible;
		setIsPasswordVisible(nextState);
		setPasswordIcon(() => (nextState ? ICONS.visible : ICONS.invisible));
	};


	const handleToggleConfirm = (
		event: MouseEvent<SVGSVGElement | HTMLButtonElement>,
	) => {
		event.preventDefault();
		event.stopPropagation();

		const nextState = !isConfirmVisible;
		setIsConfirmVisible(nextState);
		setConfirmPasswordIcon(() => (nextState ? ICONS.visible : ICONS.invisible));
	};

	async function onSubmit(data: IFormData) {
		try {
			if (variant === "signUp") {
				const { confirmPassword, ...dataToSubmit } = data as ISignUpForm;
				const finalData = { isAdmin: false, ...dataToSubmit };
				if (data.password === confirmPassword) {
					await signUp(finalData);
					navigate("/auth/signIn/");
				}
			} else {
				await signIn(data as ISignInForm);
				navigate("/");
			}
		} catch (err) {
			console.error(`error: ${err}`);
		}
	}

	const reloadPage = () => {
		window.location.reload();
	};

	return variant === "signUp" ? (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.fields}>
				<div className={styles.field}>
					<p className={styles.fieldTitle}>Ім'я</p>
					<div className={styles.input}>
						<input
							placeholder="Введіть ім'я"
							className={styles.fieldInput}
							{...register("username")}
						/>
					</div>
				</div>

				<div className={styles.field}>
					<p className={styles.fieldTitle}>Email</p>
					<div className={styles.input}>
						<input
							placeholder="Введіть email"
							className={styles.fieldInput}
							{...register("email")}
						/>
					</div>
				</div>

				<div className={styles.field}>
					<p className={styles.fieldTitle}>Пароль</p>
					<div className={styles.input}>
						<input
							placeholder="Введіть пароль"
							className={styles.fieldInput}
							type={isPasswordVisible ? "text" : "password"}
							{...register("password")}
						/>
						<PasswordIcon
							className={styles.iconInvisible}
							onClick={handleTogglePassword}
						/>
					</div>
				</div>

				<div className={styles.field}>
					<p className={styles.fieldTitle}>Підтвердження пароля</p>
					<div className={styles.input}>
						<input
							placeholder="Повторіть пароль"
							className={styles.fieldInput}
							type={isConfirmVisible ? "text" : "password"}
							{...register("confirmPassword")}
						/>
						<ConfirmPasswordIcon
							className={styles.iconInvisible}
							onClick={handleToggleConfirm}
						/>
					</div>
				</div>

				<p className={styles.isAlreadyReg}>вже є акаунт? Увійти</p>
			</div>

			<div className={styles.buttonsAndWarning}>
				<div className={styles.buttons}>
					<button type="button" className={styles.cancel} onClick={reloadPage}>
						СКАСУВАТИ
					</button>
					<button type="submit" className={styles.submit}>
						ЗАРЕЄСТРУВАТИСЯ
					</button>
				</div>
				<p className={styles.warning}>
					При вході або реєстрації, я підтверджую згоду з умовами{" "}
					<span className={styles.redText}>публічного договору</span>
				</p>
			</div>
		</form>
	) : (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.fields}>
				<div className={styles.field}>
					<p className={styles.fieldTitle}>Email</p>
					<div className={styles.input}>
						<input
							placeholder="Введіть email"
							type="email"
							className={styles.fieldInput}
							{...register("email")}
						/>
					</div>
				</div>
				<div className={styles.field}>
					<p className={styles.fieldTitle}>Пароль</p>
					<div className={styles.input}>
						<input
							placeholder="Введіть пароль"
							type={isPasswordVisible ? "text" : "password"}
							className={styles.fieldInput}
							{...register("password")}
						/>
						<PasswordIcon
							className={styles.iconInvisible}
							onClick={handleTogglePassword}
						/>
					</div>
				</div>
				<p className={styles.isAlreadyReg}>Забули пароль?</p>
			</div>
			<div className={styles.buttons}>
				<button type="button" className={styles.cancel} onClick={reloadPage}>
					СКАСУВАТИ
				</button>
				<button type="submit" className={styles.submit}>
					УВІЙТИ
				</button>
			</div>
		</form>
	);
}
