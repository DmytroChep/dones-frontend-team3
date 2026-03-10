import { useState, useEffect } from "react";
import styles from "./orderCard.module.css";
import { SHIPMENT_STATUS_MAP, type IOrder } from "../../assets/types/backend-types";
import { Truck, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { ICONS } from "../../shared";
import { useGetShipment } from "../../hooks/use-get-shipment";
import { useCreateShipment } from "../../hooks/use-create-shipment";
import { useRemoveOrder } from "../../hooks/use-remove-order";

const STATUS_STEPS = [
	"Оформлено",
	"Збирається",
	"У дорозі",
	"Доставлено",
	"Отримано",
];

const STATUS_INDEX: Record<string, number> = {
	Pending: 0,
	Collecting: 1,
	OnTheWay: 2,
	Delivered: 3,
	Received: 4,
};

interface Props {
	order: IOrder;
	onRemove: (id: number) => void;
}

export function OrderCard({ order, onRemove }: Props) {
	const [isExpanded, setIsExpanded] = useState(false);
	const { getShipment, shipment, isLoading } = useGetShipment();
	const { remove } = useRemoveOrder();

	useEffect(() => {
		if (isExpanded && order.trackingNumber) {
			getShipment(order.trackingNumber);
		}
	}, [isExpanded, order.trackingNumber, getShipment]);

	const latestCode = shipment?.items[0]?.history_tracking[0]?.code_name ?? "";

	const activeStep =
		latestCode in SHIPMENT_STATUS_MAP
			? SHIPMENT_STATUS_MAP[latestCode]
			: (STATUS_INDEX[order.status] ?? 0);

	const orderStatus = shipment
		? shipment?.items[0].history_tracking[0].code_name ===
			"Registered and being prepared"
			? "вцйа"
			: "Pending"
		: "Pending";
	console.log(orderStatus);

	const statusText = order.status === "Received" ? "Виконано" : "Оформлення";

	const dateStr = new Date(order.createdAt).toLocaleDateString("uk-UA", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	const discountedTotal = order.products.reduce((sum, p) => {
		const price = p.product.discount ?? p.priceInPurchase;
		return sum + price * p.amount;
	}, 0);

	const fullTotal = order.products.reduce(
		(sum, p) => sum + p.priceInPurchase * p.amount,
		0,
	);

	const saved = fullTotal - discountedTotal;
	const thumbs = order.products.slice(0, 2);

	const formatPrice = (price: number, showDecimals = false) => {
		const parts = price.toFixed(showDecimals ? 2 : 0).split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		return parts.join(".") + " ₴";
	};

	return (
		<div className={styles.card}>
			<div className={styles.header} onClick={() => setIsExpanded((v) => !v)}>
				<div className={styles.headerLeft}>
					<div
						className={`${styles.statusIndicator} ${
							activeStep === 4 ? styles.statusDone : styles.statusPending
						}`}
					/>
					<div className={styles.headerCols}>
						<div className={styles.headerCol}>
							<span className={styles.headerLabel}>
								№{order.id} від {dateStr}
							</span>
							<span className={styles.headerValue}>{statusText}</span>
						</div>

						<div className={styles.headerCol}>
							<span className={styles.headerLabel}>Номер відправлення</span>
							<span className={styles.headerValue}>
								{order.trackingNumber || "—"}
							</span>
						</div>

						<div className={styles.headerCol}>
							<span className={styles.headerLabel}>Сума замовлення</span>
							<span className={styles.headerValue}>
								{formatPrice(discountedTotal, true)}
							</span>
						</div>
					</div>
				</div>

				<div className={styles.headerRight}>
					<div className={styles.thumbs}>
						{thumbs.map((p) => (
							<img
								key={p.id}
								src={p.product.img.trim()}
								alt={p.product.title}
								className={styles.thumb}
							/>
						))}
					</div>
					<span className={styles.chevron}>
						{isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
					</span>
				</div>
			</div>

			{isExpanded && (
				<div className={styles.body}>
					{order.trackingNumber && (
						<div className={styles.trackingRow}>
							<span className={styles.trackingLabel}>Номер відправлення:</span>
							<span className={styles.trackingValue}>
								{order.trackingNumber}
							</span>
							<button
								type="button"
								className={styles.copyBtn}
								onClick={() =>
									navigator.clipboard.writeText(order.trackingNumber)
								}
								title="Копіювати"
							>
								<Copy size={16} />
							</button>
						</div>
					)}

					<div className={styles.progressBar}>
						<div className={styles.progressTrack} />
						<div
							className={styles.progressFill}
							style={{
								width: `${(activeStep / (STATUS_STEPS.length - 1)) * 100}%`,
							}}
						/>
						{STATUS_STEPS.map((step, i) => {
							const isCompleted = i < activeStep;
							const isActive = i === activeStep;
							return (
								<div key={step} className={styles.step}>
									<div
										className={`${styles.stepDot} ${
											isActive ? styles.stepDotActive : ""
										} ${isCompleted ? styles.stepDotCompleted : ""}`}
									>
										{isActive ? (
											<ICONS.truck className={styles.truckIcon} />
										) : isCompleted ? (
											<div className={styles.stepDotCompletedInner} />
										) : null}
									</div>
									<span
										className={`${styles.stepLabel} ${
											isActive || isCompleted ? styles.stepLabelActive : ""
										}`}
									>
										{step}
									</span>
								</div>
							);
						})}
					</div>

					<h3 className={styles.sectionTitle}>Інформація про замовлення</h3>

					<div className={styles.infoGrid}>
						<div className={styles.infoLeft}>
							<div className={styles.infoGroup}>
								<span className={styles.infoGroupTitle}>Адреса доставки</span>
								<span className={styles.infoGroupTextMedium}>
									Нова Пошта до відділення
								</span>
								<span className={styles.infoGroupText}>
									{order.deliveryAddress || "—"}
								</span>
							</div>
							<div className={styles.infoGroup}>
								<span className={styles.infoGroupTitle}>Отримувач</span>
								<span className={styles.infoGroupTextMedium}>
									{order.user.surname} {order.user.name} {order.user.middleName}
								</span>
								<span className={styles.infoGroupTextMedium}>
									{order.user.phoneNumber}
								</span>
							</div>
						</div>

						<div className={styles.infoRight}>
							<table className={styles.table}>
								<thead>
									<tr>
										<th>Фото</th>
										<th>Назва</th>
										<th>Ціна</th>
										<th>Кількість</th>
										<th>Сума</th>
									</tr>
								</thead>
								<tbody>
									{order.products.map((p) => {
										const price = p.product.discount ?? p.priceInPurchase;
										const hasDiscount =
											p.product.discount != null &&
											p.product.discount < p.priceInPurchase;
										return (
											<tr key={p.id}>
												<td>
													<div className={styles.productImgWrapper}>
														<img
															src={p.product.img.trim()}
															alt={p.product.title}
															className={styles.productImgLarge}
														/>
													</div>
												</td>
												<td>
													<div className={styles.productTitle}>
														{p.product.title}
													</div>
												</td>
												<td>
													<div className={styles.priceBlock}>
														{hasDiscount ? (
															<>
																<span className={styles.priceOld}>
																	{formatPrice(p.priceInPurchase)}
																</span>
																<span className={styles.priceNew}>
																	{formatPrice(price)}
																</span>
															</>
														) : (
															<span className={styles.priceRegular}>
																{formatPrice(p.priceInPurchase)}
															</span>
														)}
													</div>
												</td>
												<td>
													<span className={styles.qtyValue}>{p.amount}</span>
												</td>
												<td>
													<span className={styles.sumValue}>
														{formatPrice(price * p.amount)}
													</span>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>

							<div className={styles.summaryWrapper}>
								<div className={styles.summary}>
									<div className={styles.summaryRow}>
										<span className={styles.summaryLabel}>Оплата</span>
										<span className={styles.summaryValue}>
											Накладний платіж
										</span>
									</div>
									<div className={styles.summaryRow}>
										<span className={styles.summaryLabel}>Доставка</span>
										<span className={styles.summaryValue}>
											За тарифами перевізника
										</span>
									</div>
									<div className={styles.summaryRow}>
										<span className={styles.summaryLabel}>Загальна сума</span>
										<span className={styles.summaryValue}>
											{formatPrice(fullTotal)}
										</span>
									</div>
									{saved > 0 && (
										<div className={styles.summaryRow}>
											<span className={styles.summaryLabel}>Заощаджено</span>
											<span className={styles.summaryValue}>
												{formatPrice(saved)}
											</span>
										</div>
									)}
									<div
										className={`${styles.summaryRow} ${styles.summaryRowBold}`}
									>
										<span className={styles.summaryLabel}>Разом</span>
										<span className={styles.summaryValueBold}>
											{formatPrice(discountedTotal)}
										</span>
									</div>

									<div className={styles.actions}>
										<button
											type="button"
											className={styles.cancelBtn}
											onClick={() => {
												remove(order.id);
												onRemove(order.id);
											}}
										>
											Скасувати
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
