import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./header.module.css";
import { Modal } from "../../shared/Modal";
import { Form } from "../../shared/Form";

export function Header(props: { className?: string; isWhiteBg: boolean }) {
	const { className, isWhiteBg } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formType, setFormType] = useState<"auth" | "register">("auth");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const closeModal = () => setIsModalOpen(false);
	function handleInputFocus(event: React.MouseEvent) {
		setIsModalOpen(!isModalOpen);
		event.stopPropagation();
	}

	const token = localStorage.getItem("token")

	const navigate = useNavigate();

	return (
		<header
			className={`${styles.header} ${className} ${isWhiteBg ? styles.whiteBg : styles.darkBg}`}
		>
			<div className={styles.headerBlock}>
				<button className={styles.burgerBtn} type="button">
					<ICONS.burger
						className={styles.iconBurger}
						onKeyDown={() => setIsOpen(!isOpen)}
					/>
				</button>

				<div
					className={`${styles.leftBlock} ${isOpen ? styles.activeMenu : ""}`}
				>
					<Link to="/catalog/" className={styles.link}>
						КАТАЛОГ
					</Link>
					<Link to="/about/" className={styles.link}>
						ПРО НАС
					</Link>
					<Link to="/contacts/" className={styles.link}>
						КОНТАКТИ
					</Link>
				</div>

				<img
					src={IMAGES.logo}
					className={styles.logo}
					alt="logo"
					onClick={() => {
						navigate("/");
					}}
				/>

				<Modal
					className={styles.modal}
					isOpen={isModalOpen}
					onClose={closeModal}
					doCloseOnOutsideClick={true}
				>
					<div className={styles.Form}>
						<div className={styles.headerModal}>
							<p className={styles.authAndRegister}>
								<p
									className={
										formType === "auth" ? styles.blackText : styles.greyText
									}
									onClick={() => {
										setFormType("auth");
									}}
								>
									Авторизація
								</p>
								/
								<p
									className={
										formType === "register" ? styles.blackText : styles.greyText
									}
									onClick={() => {
										setFormType("register");
									}}
								>
									Реєстрація
								</p>
							</p>
							<ICONS.cross
								className={styles.cross}
								onClick={handleInputFocus}
							/>
						</div>
						<Form variant={formType === "auth" ? "signIn" : "signUp"} />
					</div>
				</Modal>

				<div className={styles.rightBlock}>
					<ICONS.cart className={styles.miniLogo} onClick={() => {}} />
					<ICONS.user className={styles.miniLogo} onClick={token ? () => {navigate("/profile/")} : handleInputFocus} />
				</div>
			</div>
		</header>
	);
}
