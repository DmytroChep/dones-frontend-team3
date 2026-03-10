import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import styles from "./productPage.module.css";
import stylesDefaultHeader from "../../app/HeaderOrder/header.module.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart-context";
import { UserContext } from "../../context/user-context";
import { ICONS } from "../../shared";
import { useForm } from "react-hook-form";
import { IAdress, ICartProduct, IUser } from "../../assets/types/backend-types";
import { useCreateOrder } from "../../hooks/use-create-order";
import { NovaPoshtaCity } from "../../assets/types/hooks/useNovaPost-types";
import { useNovaPoshtaLockers } from "../../hooks/use-get-poshtomats";

const CITIES: NovaPoshtaCity[] = [
	"Вінниця",
	"Одеса",
	"Харків",
	"Дніпро",
	"Київ",
	"Львів",
];

interface IOrderInputs {
	lastName: string;
	name: string;
	middleName: string;
	phoneNumber: string;
	email: string;
	comment: string;
}

export interface IOrderRequest {
	products: ICartProduct[];
	deliveryAddress: string;
	user: IUser;
	trackingNumber: string;
	orderStatus: string;
}

type DeliveryType = "Poshtomat" | "Department" | "KyivExpress" | "Courier";
type PaymentType =
	| "UponReceipt"
	| "CardOnline"
	| "PrivatPay"
	| "ApplePay"
	| "GooglePay";

function PoshtomatFields() {
	const [city, setCity] = useState<NovaPoshtaCity>("Дніпро");
	const [selectedLocker, setSelectedLocker] = useState("");
	const { lockers, loading, error } = useNovaPoshtaLockers({
		city,
		deliveryType: "postomat",
	});

	return (
		<div className={styles.optionMain} onClick={(e) => e.stopPropagation()}>
			<div className={styles.field}>
				<label htmlFor="poshtomat-city">Місто</label>
				<input
					id="poshtomat-city"
					value={city}
					onChange={(e) => setCity(e.target.value as NovaPoshtaCity)}
					className={styles.fieldInput}
				/>
			</div>
			<div className={styles.quickCities}>
				{CITIES.map((c) => (
					<span key={c} className={styles.cityLink} onClick={() => setCity(c)}>
						{c}
					</span>
				))}
			</div>
			<div className={styles.field}>
				<label htmlFor="poshtomat-locker">Поштомат</label>
				{loading ? (
					<p className={styles.fieldInput}>Завантаження...</p>
				) : error ? (
					<p className={styles.errorText}>Помилка завантаження поштоматів</p>
				) : (
					<select
						id="poshtomat-locker"
						value={selectedLocker}
						onChange={(e) => setSelectedLocker(e.target.value)}
						className={styles.fieldInput}
					>
						<option value="">Оберіть поштомат</option>
						{lockers.map((locker) => (
							<option key={locker.id} value={locker.name}>
								{locker.name}
							</option>
						))}
					</select>
				)}
			</div>
		</div>
	);
}

function DepartmentFields() {
	const [city, setCity] = useState<NovaPoshtaCity>("Дніпро");
	const [selectedBranch, setSelectedBranch] = useState("");
	const { lockers, loading, error } = useNovaPoshtaLockers({
		city,
		deliveryType: "department",
	});

	useEffect(() => {
		if (lockers.length > 0 && !selectedBranch) {
			setSelectedBranch(lockers[0].name);
		}
	}, [lockers]);

	return (
		<div className={styles.optionMain} onClick={(e) => e.stopPropagation()}>
			<div className={styles.field}>
				<label htmlFor="dept-city">Місто</label>
				<input
					id="dept-city"
					value={city}
					onChange={(e) => setCity(e.target.value as NovaPoshtaCity)}
					className={styles.fieldInput}
				/>
			</div>
			<div className={styles.quickCities}>
				{CITIES.map((c) => (
					<span key={c} className={styles.cityLink} onClick={() => setCity(c)}>
						{c}
					</span>
				))}
			</div>
			<div className={styles.field}>
				<label htmlFor="dept-branch">Відділення</label>
				{loading ? (
					<p className={styles.fieldInput}>Завантаження...</p>
				) : error ? (
					<p className={styles.errorText}>Помилка завантаження відділень</p>
				) : (
					<select
						id="dept-branch"
						value={selectedBranch}
						onChange={(e) => setSelectedBranch(e.target.value)}
						className={styles.fieldInput}
					>
						<option value="">Оберіть відділення</option>
						{lockers.map((locker) => (
							<option key={locker.id} value={locker.name}>
								{locker.name}
							</option>
						))}
					</select>
				)}
			</div>
		</div>
	);
}

function KyivExpressFields({ userAddresses }: { userAddresses: IAdress[] }) {
	const [selectedAddress, setSelectedAddress] = useState(
		userAddresses.length > 0
			? `${userAddresses[0].street}, ${userAddresses[0].home}`
			: "",
	);
	const [street, setStreet] = useState("");
	const [house, setHouse] = useState("");
	const [apartment, setApartment] = useState("");

	return (
		<div className={styles.optionMain} onClick={(e) => e.stopPropagation()}>
			{userAddresses.length > 0 && (
				<div className={styles.field}>
					<label htmlFor="kyiv-saved">Збережені адреси</label>
					<select
						id="kyiv-saved"
						value={selectedAddress}
						onChange={(e) => setSelectedAddress(e.target.value)}
						className={styles.fieldInput}
					>
						<option value="">Оберіть адресу</option>
						{userAddresses.map((addr) => {
							const val = `${addr.street}, ${addr.home}`;
							return (
								<option key={addr.id} value={val}>
									{val}
								</option>
							);
						})}
					</select>
				</div>
			)}
			<div className={styles.field}>
				<label htmlFor="kyiv-street">Вулиця</label>
				<input
					id="kyiv-street"
					value={street}
					onChange={(e) => setStreet(e.target.value)}
					placeholder="Назва вулиці"
					className={styles.fieldInput}
				/>
			</div>
			<div className={styles.field}>
				<label htmlFor="kyiv-house">Будинок</label>
				<input
					id="kyiv-house"
					value={house}
					onChange={(e) => setHouse(e.target.value)}
					placeholder="№ будинку"
					className={styles.fieldInput}
				/>
			</div>
			<div className={styles.field}>
				<label htmlFor="kyiv-apartment">Квартира</label>
				<input
					id="kyiv-apartment"
					value={apartment}
					onChange={(e) => setApartment(e.target.value)}
					placeholder="№ квартири"
					className={styles.fieldInput}
				/>
			</div>
		</div>
	);
}

function CourierFields() {
	const [city, setCity] = useState("Дніпро");
	const [street, setStreet] = useState("");
	const [house, setHouse] = useState("");

	return (
		<div className={styles.optionMain} onClick={(e) => e.stopPropagation()}>
			<div className={styles.field}>
				<label htmlFor="courier-city">Місто</label>
				<input
					id="courier-city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className={styles.fieldInput}
				/>
			</div>
			<div className={styles.quickCities}>
				{CITIES.map((c) => (
					<span key={c} className={styles.cityLink} onClick={() => setCity(c)}>
						{c}
					</span>
				))}
			</div>
			<div className={styles.field}>
				<label htmlFor="courier-street">Вулиця</label>
				<input
					id="courier-street"
					value={street}
					onChange={(e) => setStreet(e.target.value)}
					placeholder="Назва вулиці"
					className={styles.fieldInput}
				/>
			</div>
			<div className={styles.field}>
				<label htmlFor="courier-house">Будинок</label>
				<input
					id="courier-house"
					value={house}
					onChange={(e) => setHouse(e.target.value)}
					placeholder="№ будинку"
					className={styles.fieldInput}
				/>
			</div>
		</div>
	);
}

export function OrderPage() {
	const cartModalContextData = useContext(CartContext);
	const userContextData = useContext(UserContext);
	const [isOpenRedact, setIsOpenRedact] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const navigate = useNavigate();

	const { createOrder } = useCreateOrder();

	const products = cartModalContextData?.products;
	const user = userContextData?.user;

	const [deliveryOption, setDeliveryOption] =
		useState<DeliveryType>("Poshtomat");
	const [paymentOption, setPaymentOption] = useState<PaymentType>("CardOnline");

	const isPayNowActive = paymentOption !== "UponReceipt";

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<IOrderInputs>({
		defaultValues: {
			email: user?.email || "",
			name: user?.name || "",
			lastName: user?.surname || "",
			middleName: user?.middleName || "",
			phoneNumber: user?.phoneNumber || "",
		},
	});

	const removeProductFromCart = cartModalContextData?.removeProductFromCart;
	const incProductQuantity = cartModalContextData?.incProductQuantity;
	const decProductQuantity = cartModalContextData?.decProductQuantity;
	const removeAllProducts = cartModalContextData?.removeAllProducts;

	useEffect(() => {
		if (user) {
			reset({
				email: user.email || "",
				name: user.name || "",
				lastName: user.surname || "",
				middleName: user.middleName || "",
				phoneNumber: user.phoneNumber || "",
			});
		}
	}, [user, reset]);

	const [userAddresses, setUserAddresses] = useState<IAdress[]>([]);

	const getUserWithRels = userContextData?.getUserRelations;
	useEffect(() => {
		async function fetchAddresses() {
			if (!getUserWithRels) return;
			const data = await getUserWithRels();
			setUserAddresses(data.userAdress);
		}
		fetchAddresses();
	}, [getUserWithRels]);

	async function onSubmit(data: IOrderInputs) {
		try {
			setSubmitError(null);

			if (!user) {
				setSubmitError("Користувач не авторизований");
				return;
			}

			const finalProducts = products || [];

			if (finalProducts.length === 0) {
				setSubmitError("Кошик порожній");
				return;
			}

			const orderRequest: IOrderRequest = {
				products: finalProducts,
				deliveryAddress: deliveryOption,
				user: {
					...user,
					name: data.name,
					surname: data.lastName,
					middleName: data.middleName,
					phoneNumber: data.phoneNumber,
					email: data.email,
				},
				trackingNumber: "",
				orderStatus: "Pending",
			};

			await createOrder(orderRequest);
			removeAllProducts?.();
			navigate("/success/");
		} catch (error) {
			console.error("Order error:", error);
			setSubmitError("Помилка при оформленні замовлення. Спробуйте ще раз.");
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.mainDiv}>
			<div className={styles.makeOrder}>
				<p className={styles.title}>ОФОРМИТИ ЗАМОЛЕННЯ</p>

				<div className={styles.form}>
					<p className={styles.fromTitle}>Ваші контактні дані</p>

					<div className={styles.field}>
						<label htmlFor="lastName">Прізвище</label>
						<input
							{...register("lastName", { required: "Введіть прізвище" })}
							id="lastName"
							placeholder="Ваше Прізвище"
							className={styles.fieldInput}
						/>
						{errors.lastName && (
							<p className={styles.errorText}>{errors.lastName.message}</p>
						)}
					</div>

					<div className={styles.field}>
						<label htmlFor="name">Ім'я</label>
						<input
							{...register("name", { required: "Введіть ім'я" })}
							id="name"
							placeholder="Ваше Ім'я"
							className={styles.fieldInput}
						/>
						{errors.name && (
							<p className={styles.errorText}>{errors.name.message}</p>
						)}
					</div>

					<div className={styles.field}>
						<label htmlFor="middleName">По батькові</label>
						<input
							{...register("middleName")}
							id="middleName"
							placeholder="По батькові"
							className={styles.fieldInput}
						/>
					</div>

					<div className={styles.field}>
						<label htmlFor="phoneNumber">Телефон</label>
						<input
							{...register("phoneNumber", {
								required: "Введіть номер телефону",
							})}
							id="phoneNumber"
							placeholder="+ 38 0"
							className={styles.fieldInput}
						/>
						{errors.phoneNumber && (
							<p className={styles.errorText}>{errors.phoneNumber.message}</p>
						)}
					</div>

					<div className={styles.field}>
						<label htmlFor="email">E-mail</label>
						<input
							{...register("email", {
								required: "Введіть email",
								pattern: {
									value: /^\S+@\S+$/i,
									message: "Невірний формат email",
								},
							})}
							id="email"
							placeholder="Ваш E-mail"
							className={styles.fieldInput}
						/>
						{errors.email && (
							<p className={styles.errorText}>{errors.email.message}</p>
						)}
					</div>

					<div className={styles.field}>
						<label htmlFor="comment">Коментар до замовлення</label>
						<textarea
							{...register("comment")}
							id="comment"
							placeholder="Що б ви хотіли уточнити"
							className={styles.textarea}
						/>
					</div>

					<div className={styles.deliverySection}>
						<p className={styles.deliveryTitle}>Доставка</p>
						<div className={styles.deliveryOptions}>
							<div
								className={`${styles.deliveryOption} ${deliveryOption === "Poshtomat" ? styles.activeOption : ""}`}
								onClick={() => setDeliveryOption("Poshtomat")}
							>
								<div className={styles.optionHeader}>
									<div className={styles.radioButton}>
										{deliveryOption === "Poshtomat" && (
											<div className={styles.round} />
										)}
									</div>
									<p className={styles.optionTitle}>Нова Пошта до поштомату</p>
									<ICONS.nocaPost className={styles.novaPoshtaLogo} />
								</div>
								{deliveryOption === "Poshtomat" && <PoshtomatFields />}
							</div>

							<div
								className={`${styles.deliveryOption} ${deliveryOption === "Department" ? styles.activeOption : ""}`}
								onClick={() => setDeliveryOption("Department")}
							>
								<div className={styles.optionHeader}>
									<div className={styles.radioButton}>
										{deliveryOption === "Department" && (
											<div className={styles.round} />
										)}
									</div>
									<p className={styles.optionTitle}>Нова Пошта до відділення</p>
									<ICONS.nocaPost className={styles.novaPoshtaLogo} />
								</div>
								{deliveryOption === "Department" && <DepartmentFields />}
							</div>

							<div
								className={`${styles.deliveryOption} ${deliveryOption === "KyivExpress" ? styles.activeOption : ""}`}
								onClick={() => setDeliveryOption("KyivExpress")}
							>
								<div className={styles.optionHeader}>
									<div className={styles.radioButton}>
										{deliveryOption === "KyivExpress" && (
											<div className={styles.round} />
										)}
									</div>
									<p className={styles.optionTitle}>
										Експрес-доставка по Києву
									</p>
								</div>
								{deliveryOption === "KyivExpress" && (
									<KyivExpressFields userAddresses={userAddresses} />
								)}
							</div>

							<div
								className={`${styles.deliveryOption} ${deliveryOption === "Courier" ? styles.activeOption : ""}`}
								onClick={() => setDeliveryOption("Courier")}
							>
								<div className={styles.optionHeader}>
									<div className={styles.radioButton}>
										{deliveryOption === "Courier" && (
											<div className={styles.round} />
										)}
									</div>
									<p className={styles.optionTitle}>Нова Пошта кур'єром</p>
									<ICONS.nocaPost className={styles.novaPoshtaLogo} />
								</div>
								{deliveryOption === "Courier" && <CourierFields />}
							</div>
						</div>
					</div>

					<div className={styles.paymentSection}>
						<p className={styles.paymentTitle}>Оплата</p>
						<div className={styles.paymentOptions}>
							<div
								className={`${styles.paymentOptionContainer} ${paymentOption === "UponReceipt" ? styles.activePaymentGroup : ""}`}
								onClick={() => setPaymentOption("UponReceipt")}
							>
								<div className={styles.radioButton}>
									{paymentOption === "UponReceipt" && (
										<div className={styles.round} />
									)}
								</div>
								<p className={styles.paymentOptionText}>Оплата при отриманні</p>
							</div>

							<div
								className={`${styles.payNowWrapper} ${isPayNowActive ? styles.activePaymentGroup : ""}`}
							>
								<div
									className={styles.payNowHeader}
									onClick={() => setPaymentOption("CardOnline")}
								>
									<div className={styles.radioButton}>
										{isPayNowActive && <div className={styles.round} />}
									</div>
									<p className={styles.paymentOptionText}>Оплатити зараз</p>
									<div className={styles.paymentLogos}>
										<ICONS.paymentLogos className={styles.paymentLogos} />
									</div>
								</div>

								<div className={styles.payNowSubOptions}>
									{(
										[
											"CardOnline",
											"PrivatPay",
											"ApplePay",
											"GooglePay",
										] as PaymentType[]
									).map((option) => (
										<div
											key={option}
											className={`${styles.subOption} ${paymentOption === option ? styles.selectedSub : ""}`}
											onClick={() => setPaymentOption(option)}
										>
											<div className={styles.radioButton}>
												{paymentOption === option && (
													<div className={styles.round} />
												)}
											</div>
											<p>
												{option === "CardOnline" && "Карткою онлайн"}
												{option === "PrivatPay" && "Privat Pay"}
												{option === "ApplePay" && "Apple Pay"}
												{option === "GooglePay" && "Google Pay"}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					<button
						type="button"
						className={styles.returnButton}
						onClick={() => window.scrollTo({ top: 0 })}
					>
						ПОВЕРНУТИСЬ
					</button>
				</div>
			</div>

			{!isOpenRedact ? (
				<div className={styles.cartModal}>
					<div className={styles.headerModalCart}>
						<p className={stylesDefaultHeader.modalTitle}>Замовлення</p>
						<ICONS.edit
							className={styles.edit}
							onClick={() => setIsOpenRedact(!isOpenRedact)}
						/>
					</div>
					<div className={styles.mainCartModal}>
						{products && products.length > 0 ? (
							<div className={styles.mainCartModalDiv}>
								{products.map((element) => (
									<div className={styles.productCart} key={element.id}>
										<img
											src={element.img}
											className={stylesDefaultHeader.droneCartImage}
											alt={element.title}
										/>
										<div className={styles.otherCartProdcutInfo}>
											<div className={stylesDefaultHeader.titleAndPrice}>
												<p className={stylesDefaultHeader.title}>
													{element.title}
												</p>
												<div className={stylesDefaultHeader.price}>
													{element.discount ? (
														<>
															<p className={stylesDefaultHeader.priceText}>
																{element.price} $
															</p>
															<p className={stylesDefaultHeader.discount}>
																{element.discount} $
															</p>
														</>
													) : (
														<p className={stylesDefaultHeader.withoutDiscount}>
															{element.price} $
														</p>
													)}
												</div>
											</div>
											<div className={stylesDefaultHeader.quantity}>
												<div className={stylesDefaultHeader.changeQuantity}>
													<p>{element.quantity}</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className={stylesDefaultHeader.cartNullDiv}>
								<p className={stylesDefaultHeader.cartNullText}>
									Ваш кошик порожній.
									<br />
									Почніть вибирати товари, щоб вони з'явилися тут
								</p>
							</div>
						)}
					</div>
					{products && products.length > 0 && (
						<div className={stylesDefaultHeader.cost}>
							<div className={stylesDefaultHeader.generalCostDiv}>
								<p className={stylesDefaultHeader.generalCostText}>
									Загальна сума
								</p>
								<p className={stylesDefaultHeader.generalCost}>
									{products.reduce(
										(sum, el) => sum + el.price * el.quantity,
										0,
									)}{" "}
									₴
								</p>
							</div>
							<div className={stylesDefaultHeader.generalCostDiv}>
								<p className={stylesDefaultHeader.savedText}>Заощадженно</p>
								<p className={stylesDefaultHeader.saved}>
									-
									{products.reduce(
										(sum, el) =>
											sum +
											(el.discount ? el.price - el.discount : 0) * el.quantity,
										0,
									)}{" "}
									₴
								</p>
							</div>
							<div className={stylesDefaultHeader.generalCostDiv}>
								<p className={stylesDefaultHeader.savedText}>Доставка</p>
								<p className={stylesDefaultHeader.saved}>
									За тарифом перевізника
								</p>
							</div>
							<div className={stylesDefaultHeader.generalCostDiv}>
								<p className={stylesDefaultHeader.withDiscountText}>
									Зі знижкою
								</p>
								<p className={stylesDefaultHeader.withDiscount}>
									{products.reduce(
										(sum, el) => sum + (el.discount || el.price) * el.quantity,
										0,
									)}{" "}
									₴
								</p>
							</div>
						</div>
					)}

					{submitError && (
						<p style={{ color: "red", padding: "8px 0" }}>{submitError}</p>
					)}

					<div className={styles.buttonDiv}>
						{products?.length === 0 ? (
							<button className={stylesDefaultHeader.button} type="button">
								ПРОДОВЖИТИ ПОКУПКИ
							</button>
						) : (
							<Button
								arrowColor="white"
								className={stylesDefaultHeader.darkButton}
								textClassName={stylesDefaultHeader.whiteText}
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? "ОБРОБКА..." : "ПІДТВЕРДИТИ ЗАМОВЛЕННЯ"}
							</Button>
						)}
					</div>
				</div>
			) : (
				<div className={stylesDefaultHeader.cartModal}>
					<div className={styles.headerModalCart}>
						<p className={stylesDefaultHeader.modalTitle}>Замовлення</p>
						<ICONS.edit
							className={styles.edit}
							onClick={() => setIsOpenRedact(!isOpenRedact)}
						/>
					</div>
					<div className={stylesDefaultHeader.mainCartModal}>
						{products && products.length > 0 ? (
							<div className={stylesDefaultHeader.mainCartModalDiv}>
								{products.map((element) => (
									<div
										className={stylesDefaultHeader.productCart}
										key={element.id}
									>
										<img
											src={element.img}
											className={stylesDefaultHeader.droneCartImage}
										/>
										<div className={stylesDefaultHeader.otherCartProdcutInfo}>
											<div className={stylesDefaultHeader.titleAndPrice}>
												<p className={stylesDefaultHeader.title}>
													{element.title}
												</p>
												{element.discount ? (
													<div className={stylesDefaultHeader.price}>
														<p className={stylesDefaultHeader.priceText}>
															{element.price} $
														</p>
														<p className={stylesDefaultHeader.discount}>
															{element.discount} $
														</p>
													</div>
												) : (
													<div className={stylesDefaultHeader.price}>
														<p className={stylesDefaultHeader.withoutDiscount}>
															{element.price} $
														</p>
													</div>
												)}
											</div>
											<div className={stylesDefaultHeader.quantity}>
												<div className={stylesDefaultHeader.changeQuantity}>
													<button
														className={stylesDefaultHeader.changeQuantityButton}
														type="button"
														onClick={
															decProductQuantity
																? () => decProductQuantity(element.id)
																: () => {}
														}
													>
														-
													</button>
													<p>{element.quantity}</p>
													<button
														className={stylesDefaultHeader.changeQuantityButton}
														type="button"
														onClick={
															incProductQuantity
																? () => incProductQuantity(element.id)
																: () => {}
														}
													>
														+
													</button>
												</div>
											</div>
											<ICONS.trash
												className={stylesDefaultHeader.trashIcon}
												onClick={
													removeProductFromCart
														? () => removeProductFromCart(element.id)
														: () => {}
												}
											/>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className={stylesDefaultHeader.cartNullDiv}>
								<p className={stylesDefaultHeader.cartNullText}>
									Ваш кошик порожній.
									<br />
									Почніть вибирати товари, щоб вони з'явилися тут
								</p>
							</div>
						)}
					</div>
					{products && products.length > 0 ? (
						<div className={stylesDefaultHeader.cost}>
							<div className={stylesDefaultHeader.generalCostDiv}>
								<p className={stylesDefaultHeader.generalCostText}>
									Загальна сума
								</p>
								<p className={stylesDefaultHeader.generalCost}>
									{products.reduce(
										(sum, el) => sum + el.price * el.quantity,
										0,
									)}{" "}
									₴
								</p>
							</div>
							<div className={stylesDefaultHeader.generalCostDiv}>
								<p className={stylesDefaultHeader.savedText}>Заощадженно</p>
								<p className={stylesDefaultHeader.saved}>
									-
									{products.reduce(
										(sum, el) =>
											sum +
											(el.discount ? el.price - el.discount : 0) * el.quantity,
										0,
									)}{" "}
									₴
								</p>
							</div>
							<div className={stylesDefaultHeader.generalCostDiv}>
								<p className={stylesDefaultHeader.withDiscountText}>
									Зі знижкою
								</p>
								<p className={stylesDefaultHeader.withDiscount}>
									{products.reduce(
										(sum, el) => sum + (el.discount || el.price) * el.quantity,
										0,
									)}{" "}
									₴
								</p>
							</div>
						</div>
					) : (
						<p />
					)}
					{products?.length === 0 ? (
						<div className={stylesDefaultHeader.buttonDiv}>
							<button className={stylesDefaultHeader.button} type="button">
								ЗБЕРЕГТИ
							</button>
						</div>
					) : (
						<div className={stylesDefaultHeader.buttonDiv}>
							<button
								className={stylesDefaultHeader.button}
								type="button"
								onClick={() => setIsOpenRedact(false)}
							>
								СКАСУВАТИ
							</button>
							<div onClick={() => setIsOpenRedact(false)}>
								<Button
									arrowColor="white"
									className={stylesDefaultHeader.darkButton}
									textClassName={stylesDefaultHeader.whiteText}
								>
									ЗБЕРЕГТИ
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</form>
	);
}