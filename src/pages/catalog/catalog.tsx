import { useState, useMemo, useEffect, useContext } from "react";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import { useProductsSugg } from "../../hooks/use-suggestions";
import { ICONS, IMAGES } from "../../shared";
import styles from "./catalog.module.css";
import { CartContext } from "../../context/cart-context";
import { IProduct } from "../../assets/types";

export function CatalogPage() {
	const { products, isLoaded } = useProductsSugg({ typeOfSuggestion: "new" });
	const [choosedFilter, setChoosedFilter] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	const navigate = useNavigate();

	const filteredProducts = useMemo(() => {
		if (choosedFilter === "all") return products;
		return products.filter((p) =>
			p.category.some((cat) => cat.name === choosedFilter),
		);
	}, [products, choosedFilter]);

	const lastItemIndex = currentPage * itemsPerPage;
	const firstItemIndex = lastItemIndex - itemsPerPage;
	const currentItems = filteredProducts.slice(firstItemIndex, lastItemIndex);

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const handleFilterChange = (filter: string) => {
		setChoosedFilter(filter);
		setCurrentPage(1);
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const cartContextData = useContext(CartContext);

	const addProductToCart = cartContextData?.addToCart;
	const cartProducts = cartContextData?.products || [];
	const incChangesCount = cartContextData?.incChangesCount;

	return (
		<div className={styles.catalog}>
			<p className={styles.catalogTitle}>КАТАЛОГ</p>
			<div className={styles.catalogDiv}>
				<div className={styles.filters}>
					<button
						type="button"
						className={
							choosedFilter === "all" ? styles.choosedFilter : styles.filter
						}
						onClick={() => handleFilterChange("all")}
					>
						Всі
					</button>

					<button
						type="button"
						className={
							choosedFilter === "drone" ? styles.choosedFilter : styles.filter
						}
						onClick={() => handleFilterChange("drone")}
					>
						<img src={IMAGES.drone} className={styles.droneFilter} alt="" />
					</button>

					<button
						type="button"
						className={
							choosedFilter === "monocular"
								? styles.choosedFilter
								: styles.filter
						}
						onClick={() => handleFilterChange("monocular")}
					>
						<img src={IMAGES.monocular} className={styles.lenseFilter} alt="" />
					</button>
				</div>

				<div className={styles.products}>
					{isLoaded ? (
						currentItems.map((element) => (
							<div
								className={styles.droneCardCatalog}
								onClick={() => navigate(`/product/${element.id}`)}
								key={`catalog${element.id}`}
							>
								<img
									src={element.img}
									className={styles.catalogImage}
									alt={element.title}
								/>
								<div className={styles.textBlock}>
									<div className={styles.titleAndPrice}>
										<p className={styles.droneTitle}>{element.title}</p>
										{element.discount ? (
											<div className={styles.price}>
												<p className={styles.priceText}>{element.price} $</p>
												<p className={styles.discount}>{element.discount} $</p>
											</div>
										) : (
											<div className={styles.price}>
												<p className={styles.withoutDiscount}>
													{element.price} $
												</p>
											</div>
										)}
									</div>
									<div
										className={styles.buyButton}
										onClick={(event) => {
											event.stopPropagation();

											if (
												addProductToCart &&
												incChangesCount &&
												!cartProducts.some(
													(product) => product.id === element.id,
												)
											) {
												addProductToCart({ ...element, quantity: 1 });
												incChangesCount();
											}
										}}
									>
										<ICONS.blackCart className={`${styles.buyIcon}`} />
									</div>
								</div>
							</div>
						))
					) : (
						<ThreeDot color="#6f6f6f" size="medium" />
					)}
				</div>

				{isLoaded && totalPages > 1 && (
					<div className={styles.pagination}>
						<button
							type="button"
							disabled={currentPage === 1}
							onClick={() => {
								setCurrentPage((prev) => prev - 1);
							}}
							className={styles.arrowBtn}
						>
							{"<"}
						</button>

						{[...Array(totalPages)].map((_, index) => {
							const pageNumber = index + 1;
							return (
								<button
									type="button"
									key={`page-${pageNumber}`}
									onClick={() => {
										setCurrentPage(pageNumber);
										// window.scrollTo({ top: 20, behavior: "smooth" });
									}}
									className={
										currentPage === pageNumber
											? styles.activePage
											: styles.pageBtn
									}
								>
									{pageNumber}
								</button>
							);
						})}

						<button
							type="button"
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage((prev) => prev + 1)}
							className={styles.arrowBtn}
						>
							{">"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
