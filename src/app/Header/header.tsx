import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./header.module.css";
import { Modal } from "../../shared/Modal";
import { Form } from "../../shared/Form";
import { CartModal } from "../../components/cartModal";
import { CartContext } from "../../context/cart-context";
import { IProduct } from "../../assets/types";
import { ICartProduct } from "../../assets/types/backend-types";

export function Header(props: { className?: string; isWhiteBg: boolean }) {
	const { className, isWhiteBg } = props;
	const [searchParams] = useSearchParams();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formType, setFormType] = useState<"auth" | "register">("auth");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);
	const [resetStep, setResetStep] = useState<number>(0);

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		const code = searchParams.get("code");
		if (code) {
			setIsModalOpen(true);
			setResetStep(2);
		}
	}, [searchParams]);

	const closeModal = () => {
		setIsModalOpen(false);
		setResetStep(0);
	};

	const closeCartModal = () => {
		setIsCartModalOpen(false);
	};

	function handleInputFocusCart(event: React.MouseEvent) {
		setIsCartModalOpen(!isCartModalOpen);
		if (!isModalOpen) setResetStep(0);
		event.stopPropagation();
	}

	function handleInputFocus(event: React.MouseEvent) {
		setIsModalOpen(!isModalOpen);
		if (!isModalOpen) setResetStep(0);
		event.stopPropagation();
	}

	const cartDivRef = useRef<HTMLDivElement>(null);

	const cartModalContextData = useContext(CartContext);

	const products = cartModalContextData?.products;
	const removeProductFromCart = cartModalContextData?.removeProductFromCart;
	const incProductQuantity = cartModalContextData?.incProductQuantity;
	const decProductQuantity = cartModalContextData?.decProductQuantity;

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
					onClick={() => navigate("/")}
				/>

				<Modal
					className={styles.modal}
					isOpen={isModalOpen}
					onClose={closeModal}
					doCloseOnOutsideClick={true}
				>
					<div className={styles.Form}>
						<div className={styles.headerModal}>
							{resetStep > 0 ? (
								<p className={styles.blackText}>Відновлення пароля</p>
							) : (
								<div className={styles.authAndRegister}>
									<p
										className={
											formType === "auth" ? styles.blackText : styles.greyText
										}
										onClick={() => setFormType("auth")}
									>
										Авторизація
									</p>
									<span>/</span>
									<p
										className={
											formType === "register"
												? styles.blackText
												: styles.greyText
										}
										onClick={() => setFormType("register")}
									>
										Реєстрація
									</p>
								</div>
							)}
							<ICONS.cross className={styles.cross} onClick={closeModal} />
						</div>

						<Form
							variant={formType === "auth" ? "signIn" : "signUp"}
							resetStep={resetStep}
							setResetStep={setResetStep}
						/>
					</div>
				</Modal>

				<div className={styles.rightBlock}>
					<div
						className={styles.cartBlock}
						onClick={handleInputFocusCart}
						ref={cartDivRef}
					>
						<ICONS.cart className={styles.miniLogo} />
						<CartModal
							portalElem={cartDivRef}
							className={styles.cartModal}
							isOpen={isCartModalOpen}
							onClose={closeCartModal}
							doCloseOnOutsideClick={false}
						>
							<div className={styles.headerModalCart}>
								<p className={styles.modalTitle}>Кошик</p>
								<ICONS.cross
									className={styles.cross}
									onClick={handleInputFocusCart}
								/>
							</div>
							<div className={styles.mainCartModal}>
								{products ? (
									!(products.length === 0) ? (
										<div className={styles.mainCartModalDiv}>
											{
											products.map((element) => {
												return (
													<div className={styles.productCart} key={element.id}>
														<img
															src={element.img}
															className={styles.droneCartImage}
														/>
														<div className={styles.otherCartProdcutInfo}>
															<div className={styles.titleAndPrice}>
																<p className={styles.title}>{element.title}</p>
																{element.discount ? (
																	<div className={styles.price}>
																		<p className={styles.priceText}>
																			{element.price} $
																		</p>
																		<p className={styles.discount}>
																			{element.discount} $
																		</p>
																	</div>
																) : (
																	<div className={styles.price}>
																		<p className={styles.withoutDiscount}>
																			{element.price} $
																		</p>
																	</div>
																)}
															</div>
															<div className={styles.quantity}>
																<div className={styles.changeQuantity}>
																	<button
																		className={styles.changeQuantityButton}
																		type="button"
																		onClick={
																			decProductQuantity
																				? () => {
																						decProductQuantity(element.id);
																					}
																				: () => {}
																		}
																	>
																		-
																	</button>
																	<p>{element.quantity}</p>
																	<button
																		className={styles.changeQuantityButton}
																		type="button"
																		onClick={
																			incProductQuantity
																				? () => {
																						incProductQuantity(element.id);
																					}
																				: () => {}
																		}
																	>
																		+
																	</button>
																</div>
															</div>
															<ICONS.trash
																className={styles.trashIcon}
																onClick={
																	removeProductFromCart
																		? () => {
																				removeProductFromCart(element.id);
																			}
																		: () => {}
																}
															/>
														</div>
													</div>
												);
											})
										}
										</div>
									) : (
										<div className={styles.cartNullDiv}>
											<p className={styles.cartNullText}>
												Ваш кошик порожній.
												<br />
												Почніть вибирати товари, щоб вони з’явилися тут
											</p>
										</div>
									)
								) : (
									<p></p>
								)}
							</div>
							<div className={styles.cost}>
								<div className={styles.generalCostDiv}>
									<p className={styles.generalCostText}>
										Загальна сума
									</p>
									<p className={styles.generalCost}>
										{products?.reduce((sum, element) => {
											return sum + element.price * element.quantity;
										}, 0)} ₴
									</p>
								</div>

								<div className={styles.generalCostDiv}>
									<p className={styles.savedText}>
										Заощадженно
									</p>
									<p className={styles.saved}>
										-{products?.reduce((sum, element) => {
											const savingPerItem = element.discount 
												? (element.price - element.discount) 
												: 0;
											return sum + (savingPerItem * element.quantity);
										}, 0)} ₴
									</p>
								</div>

								<div className={styles.generalCostDiv}>
									<p className={styles.withDiscountText}>
										Зі знижкою
									</p>
									<p className={styles.withDiscount}>
										{products?.reduce((sum, element) => {
											const actualPrice = element.discount || element.price;
											return sum + (actualPrice * element.quantity);
										}, 0)} ₴
									</p>
								</div>
							</div>
							<div className={styles.buttonDiv}>
								<button
									className={styles.button}
									type="button"
									onClick={handleInputFocusCart}
								>
									ПРОДОВЖИТИ ПОКУПКИ
								</button>
							</div>
						</CartModal>
					</div>
					<ICONS.user
						className={styles.miniLogo}
						onClick={token ? () => navigate("/profile/") : handleInputFocus}
					/>
				</div>
			</div>
		</header>
	);
}
