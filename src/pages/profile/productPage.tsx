import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context";
import styles from "./productPage.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { IUpdateuser } from "../../assets/types/hooks/update-user-types";
import { useUpdateUserData } from "../../hooks/use-update-user-data";
import { IAdress } from "../../assets/types/backend-types";
import { useUpdateAdress } from "../../hooks/use-update-address";
import { useCreateAdress } from "../../hooks/use-create-address";

const CITIES = ["Вінниця", "Одеса", "Харків", "Дніпро", "Київ", "Львів"];

export function Profile() {
	const contextData = useContext(UserContext);
	const user = contextData?.user;
	const userAdresses = contextData?.getUserRelations;
	const logout = contextData?.logout;
	const navigate = useNavigate();

	const [choosedOption, setChoosedOption] = useState<
		"userData" | "orders" | "deliveries"
	>("userData");

	const userDataHookData = useUpdateUserData();

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

	const [addresses, setAddresses] = useState<IAdress[]>([]);
	const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
		null,
	);
	const [editingValues, setEditingValues] = useState<Record<number, IAdress>>(
		{},
	);
	const [newAddressIds, setNewAddressIds] = useState<Set<number>>(new Set());

	const hasFetched = useRef(false);

	useEffect(() => {
		if (!userAdresses || hasFetched.current) return;
		hasFetched.current = true;
		const fetchAddresses = async () => {
			const data = await userAdresses();
			if (data?.userAdress && data.userAdress.length > 0) {
				setAddresses(data.userAdress);
				setSelectedAddressId(data.userAdress[0].id);
			}
		};
		fetchAddresses();
	}, [userAdresses]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const updateAdress = useUpdateAdress();
	const createAdress = useCreateAdress()
	if (!contextData || !userDataHookData) return null;

	const { update } = userDataHookData;
	const updateAdressFunc = updateAdress?.update;
	const createAdressFunc = createAdress?.createAdress;

	const getAddressLabel = (addr: IAdress) =>
		`м. ${addr.city}, вул. ${addr.street}, ${addr.home}`;

	const handleAddressSelect = (id: number) => {
		setSelectedAddressId(id);
		if (!editingValues[id]) {
			const addr = addresses.find((a) => a.id === id);
			if (addr) setEditingValues((prev) => ({ ...prev, [id]: { ...addr } }));
		}
	};

	const handleFieldChange = (
		id: number,
		field: keyof IAdress,
		value: string,
	) => {
		setEditingValues((prev) => ({
			...prev,
			[id]: {
				...(prev[id] || addresses.find((a) => a.id === id)!),
				[field]: value,
			},
		}));
	};

	const handleAddAddress = () => {
		const newId = Date.now();
		const newAddr: IAdress = {
			id: newId,
			city: "",
			street: "",
			home: "",
			appartament: "",
			entrants: "",
		};
		setAddresses((prev) => [...prev, newAddr]);
		setSelectedAddressId(newId);
		setEditingValues((prev) => ({ ...prev, [newId]: { ...newAddr } }));
		setNewAddressIds((prev) => new Set(prev).add(newId));
	};

	const onSubmitUserData = (data: IUpdateuser) => {
		const filteredData = Object.fromEntries(
			Object.entries(data).filter(
				([_, value]) => value && String(value).trim() !== "",
			),
		);
		update(filteredData);
	};

	const onSubmitDelivery = (id: number) => {
		const updated = editingValues[id];
		if (!updated) return;

		const isNew = newAddressIds.has(id);

		if (isNew) {
			setAddresses((prev) =>
				prev.map((a) => (a.id === id ? { ...updated } : a)),
			);
			setNewAddressIds((prev) => {
				const next = new Set(prev);
				next.delete(id);
				return next;
			});
			const {id, ...finalData }= { ...updated, postDepartament: "Відділення №1" };
			createAdressFunc?.(finalData);
			return;
		}
		setAddresses((prev) => prev.map((a) => (a.id === id ? { ...updated } : a)));
		updateAdressFunc?.(updated);
	};

	return (
		<div className={styles.main}>
			<div className={styles.profileLinks}>
				<p className={styles.linksTitle}>ОСОБИСТИЙ КАБІНЕТ</p>
				<p
					className={
						choosedOption === "userData" ? styles.choosedOption : styles.link
					}
					onClick={() => setChoosedOption("userData")}
				>
					КОНТАКТНІ ДАНІ
				</p>
				<p
					className={
						choosedOption === "orders" ? styles.choosedOption : styles.link
					}
					onClick={() => setChoosedOption("orders")}
				>
					МОЇ ЗАМОВЛЕННЯ
				</p>
				<p
					className={
						choosedOption === "deliveries" ? styles.choosedOption : styles.link
					}
					onClick={() => setChoosedOption("deliveries")}
				>
					АДРЕСА ДОСТАВКИ
				</p>
				<hr className={styles.hr} />
				<p
					className={styles.link}
					onClick={() => {
						logout?.();
						navigate("/");
					}}
				>
					ВИЙТИ
				</p>
			</div>

			<form
				onSubmit={handleSubmit(onSubmitUserData)}
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
			/>

			<div
				className={
					choosedOption === "deliveries" ? styles.deliveries : styles.hidden
				}
			>
				<p className={styles.sectionTitle}>Адреса доставки</p>

				<div className={styles.addressList}>
					{addresses.map((addr) => {
						const isSelected = selectedAddressId === addr.id;
						const editing = editingValues[addr.id] || addr;
						const fieldId = (field: string) => `addr-${addr.id}-${field}`;

						return (
							<form
								key={addr.id}
								className={`${styles.addressCard} ${isSelected ? styles.addressCardSelected : ""}`}
								onSubmit={(e) => {
									e.preventDefault();
									onSubmitDelivery(addr.id);
								}}
							>
								<div
									className={styles.cardHeader}
									onClick={() => handleAddressSelect(addr.id)}
								>
									<label className={styles.radioLabel}>
										<input
											type="radio"
											name="selectedAddress"
											checked={isSelected}
											onChange={() => handleAddressSelect(addr.id)}
											className={styles.radioInput}
										/>
										<span className={styles.radioCustom} />
										<span className={styles.addressSummary}>
											{addr.city && addr.street && addr.home
												? getAddressLabel(addr)
												: "Нова адреса"}
										</span>
									</label>
									<button
										type="button"
										className={styles.editBtn}
										onClick={(e) => {
											e.stopPropagation();
											handleAddressSelect(addr.id);
										}}
										aria-label="Редагувати"
									>
										✏
									</button>
								</div>

								{isSelected && (
									<div className={styles.cardBody}>
										<div className={styles.formField}>
											<label
												htmlFor={fieldId("city")}
												className={styles.formLabel}
											>
												Місто
											</label>
											<input
												id={fieldId("city")}
												className={styles.formInput}
												value={editing.city}
												onChange={(e) =>
													handleFieldChange(addr.id, "city", e.target.value)
												}
												placeholder="Місто"
											/>
											<div className={styles.citySuggestions}>
												{CITIES.map((city) => (
													<span
														key={city}
														className={`${styles.citySuggestion} ${editing.city === city ? styles.citySuggestionActive : ""}`}
														onClick={() =>
															handleFieldChange(addr.id, "city", city)
														}
													>
														{city}
													</span>
												))}
											</div>
										</div>

										<div className={styles.formField}>
											<label
												htmlFor={fieldId("street")}
												className={styles.formLabel}
											>
												Вулиця
											</label>
											<input
												id={fieldId("street")}
												className={styles.formInput}
												value={editing.street}
												onChange={(e) =>
													handleFieldChange(addr.id, "street", e.target.value)
												}
												placeholder="вул. Назва вулиці"
											/>
										</div>

										<div className={styles.formField}>
											<label
												htmlFor={fieldId("home")}
												className={styles.formLabel}
											>
												Будинок
											</label>
											<input
												id={fieldId("home")}
												className={styles.formInput}
												value={editing.home}
												onChange={(e) =>
													handleFieldChange(addr.id, "home", e.target.value)
												}
												placeholder="Номер будинку"
											/>
										</div>

										<div className={styles.formField}>
											<label
												htmlFor={fieldId("appartament")}
												className={styles.formLabel}
											>
												Квартира
											</label>
											<input
												id={fieldId("appartament")}
												className={styles.formInput}
												value={editing.appartament}
												onChange={(e) =>
													handleFieldChange(
														addr.id,
														"appartament",
														e.target.value,
													)
												}
												placeholder="Номер квартири"
											/>
										</div>

										<div className={styles.formField}>
											<label
												htmlFor={fieldId("entrants")}
												className={styles.formLabel}
											>
												Під'їзд
											</label>
											<input
												id={fieldId("entrants")}
												className={styles.formInput}
												value={editing.entrants}
												onChange={(e) =>
													handleFieldChange(addr.id, "entrants", e.target.value)
												}
												placeholder="Номер під'їзду"
											/>
										</div>

										<button type="submit" className={styles.saveBtn}>
											ЗБЕРЕГТИ ЗМІНИ
										</button>
									</div>
								)}
							</form>
						);
					})}
				</div>

				<button
					type="button"
					className={styles.addAddressBtn}
					onClick={handleAddAddress}
				>
					+ ДОДАТИ АДРЕСУ
				</button>
			</div>
		</div>
	);
}
