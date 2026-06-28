import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import styles from "./productPage.module.css";
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

	const CartSummary = () => (
		<div className={styles.cost}>
			<div className={styles.generalCostDiv}>
				<p className={styles.generalCostText}>Загальна сума</p>
				<p className={styles.generalCost}>
					{products?.reduce((sum, el) => sum + el.price * el.quantity, 0)} ₴
				</p>
			</div>
			<div className={styles.generalCostDiv}>
				<p className={styles.savedText}>Заощадженно</p>
				<p className={styles.saved}>
					-
					{products?.reduce(
						(sum, el) =>
							sum + (el.discount ? el.price - el.discount : 0) * el.quantity,
						0,
					)}{" "}
					₴
				</p>
			</div>
			<div className={styles.generalCostDiv}>
				<p className={styles.savedText}>Доставка</p>
				<p className={styles.saved}>За тарифом перевізника</p>
			</div>
			<div className={styles.generalCostDiv}>
				<p className={styles.withDiscountText}>Зі знижкою</p>
				<p className={styles.withDiscount}>
					{products?.reduce(
						(sum, el) => sum + (el.discount || el.price) * el.quantity,
						0,
					)}{" "}
					₴
				</p>
			</div>
		</div>
	);

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
							{(
								[
									"Poshtomat",
									"Department",
									"KyivExpress",
									"Courier",
								] as DeliveryType[]
							).map((type) => (
								<div
									key={type}
									className={`${styles.deliveryOption} ${deliveryOption === type ? styles.activeOption : ""}`}
									onClick={() => setDeliveryOption(type)}
								>
									<div className={styles.optionHeader}>
										<div className={styles.radioButton}>
											{deliveryOption === type && (
												<div className={styles.round} />
											)}
										</div>
										<p className={styles.optionTitle}>
											{type === "Poshtomat" && "Нова Пошта до поштомату"}
											{type === "Department" && "Нова Пошта до відділення"}
											{type === "KyivExpress" && "Експрес-доставка по Києву"}
											{type === "Courier" && "Нова Пошта кур'єром"}
										</p>
										{type !== "KyivExpress" && (
											<ICONS.nocaPost className={styles.novaPoshtaLogo} />
										)}
									</div>
									{deliveryOption === "Poshtomat" && type === "Poshtomat" && (
										<PoshtomatFields />
									)}
									{deliveryOption === "Department" && type === "Department" && (
										<DepartmentFields />
									)}
									{deliveryOption === "KyivExpress" &&
										type === "KyivExpress" && (
											<KyivExpressFields userAddresses={userAddresses} />
										)}
									{deliveryOption === "Courier" && type === "Courier" && (
										<CourierFields />
									)}
								</div>
							))}
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

			<div className={styles.cartModal}>
				<div className={styles.headerModalCart}>
					<p className={styles.modalTitle}>Замовлення</p>
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
										className={styles.droneCartImage}
										alt={element.title}
									/>
									<div className={styles.otherCartProdcutInfo}>
										<div className={styles.titleAndPrice}>
											<p className={styles.cartProductTitle}>{element.title}</p>
											<div className={styles.price}>
												{element.discount ? (
													<>
														<p className={styles.priceText}>
															{element.price} $
														</p>
														<p className={styles.discount}>
															{element.discount} $
														</p>
													</>
												) : (
													<p className={styles.withoutDiscount}>
														{element.price} $
													</p>
												)}
											</div>
										</div>

										{isOpenRedact ? (
											<div className={styles.quantity}>
												<div className={styles.changeQuantity}>
													<button
														className={styles.changeQuantityButton}
														type="button"
														onClick={() => decProductQuantity?.(element.id)}
													>
														-
													</button>
													<p>{element.quantity}</p>
													<button
														className={styles.changeQuantityButton}
														type="button"
														onClick={() => incProductQuantity?.(element.id)}
													>
														+
													</button>
												</div>
											</div>
										) : (
											<div className={styles.quantity}>
												<div className={styles.changeQuantity}>
													<p>{element.quantity}</p>
												</div>
											</div>
										)}

										{isOpenRedact && (
											<ICONS.trash
												className={styles.trashIcon}
												onClick={() => removeProductFromCart?.(element.id)}
											/>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className={styles.cartNullDiv}>
							<p className={styles.cartNullText}>
								Ваш кошик порожній.
								<br />
								Почніть вибирати товари, щоб вони з'явилися тут
							</p>
						</div>
					)}
				</div>

				{products && products.length > 0 && <CartSummary />}

				{submitError && (
					<p style={{ color: "red", padding: "0.55vw 1.67vw" }}>
						{submitError}
					</p>
				)}

				<div className={styles.buttonDiv}>
					{isOpenRedact ? (
						<>
							<button
								className={styles.outlineButton}
								type="button"
								onClick={() => setIsOpenRedact(false)}
							>
								СКАСУВАТИ
							</button>
							<div onClick={() => setIsOpenRedact(false)}>
								<Button
									arrowColor="white"
									className={styles.darkButton}
									textClassName={styles.whiteText}
								>
									ЗБЕРЕГТИ
								</Button>
							</div>
						</>
					) : products?.length === 0 ? (
						<button className={styles.outlineButton} type="button">
							ПРОДОВЖИТИ ПОКУПКИ
						</button>
					) : (
						<Button
							arrowColor="white"
							className={styles.darkButton}
							textClassName={styles.whiteText}
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "ОБРОБКА..." : "ПІДТВЕРДИТИ ЗАМОВЛЕННЯ"}
						</Button>
					)}
				</div>
			</div>
		</form>
	);
}
