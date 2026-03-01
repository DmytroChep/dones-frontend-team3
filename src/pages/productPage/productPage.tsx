import { ThreeDot } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/use-post-by-id";
import { useProductsSugg } from "../../hooks/use-suggestions";
import { ICONS, IMAGES } from "../../shared";
import { Button } from "../../shared/button";
import styles from "./productPage.module.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart-context";

export function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const productId = Number(id);
	const { product, isLoaded } = useProductById(productId);

	const { products } = useProductsSugg({
		sameAs: { name: product?.title, limit: 4 },
	});

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const cartContextData = useContext(CartContext);

	const addProductToCart = cartContextData?.addToCart;
	const cartProducts = cartContextData?.products;
	const incChangesCount = cartContextData?.incChangesCount;
	const incProductQuantity = cartContextData?.incProductQuantity;

	return (
		<div className={styles.productPage}>
			<div className={styles.topBlock}>
				{isLoaded ? (
					<div className={styles.titleAndDescBlock}>
						<p className={styles.title}>{product?.title.toLocaleUpperCase()}</p>
						<p className={styles.description}>{product?.description}</p>
					</div>
				) : (
					<ThreeDot color="#6f6f6f" size="medium" text="" textColor="" />
				)}
				<img
					src={product?.img}
					className={
						product?.category !== undefined &&
						!(product?.category[0].name === "monocular")
							? styles.droneImage
							: styles.monocularImage
					}
				/>
				<div className={styles.ovalShell}>
					<div className={styles.oval}></div>
				</div>
				<div className={styles.buyBlock}>
					<div className={styles.droneInfoSmall}>
						<img src={product?.img} className={styles.droneImageSmall} />
						<div className={styles.priceAndTitle}>
							<p className={styles.smallTitle}>{product?.title}</p>
							{product?.discount ? (
								<div className={styles.price}>
									<p className={styles.priceText}>{product?.price} $</p>
									<p className={styles.discount}>{product?.discount} $</p>
								</div>
							) : (
								<div className={styles.price}>
									<p className={styles.withoutDiscount}>{product?.price} $</p>
								</div>
							)}
						</div>
					</div>
					<div className={styles.buttonsBlock}>
						<button
							className={styles.buttonCart}
							type="button"
							onClick={(event) => {
								event.stopPropagation();

								if (
									addProductToCart &&
									cartProducts &&
									incChangesCount &&
									product &&
									!cartProducts.some((element) => element.id === product.id)
								) {
									addProductToCart({ ...product, quantity: 1 });
									incChangesCount();
								} else if (
									incProductQuantity &&
									cartProducts &&
									product &&
									cartProducts.some((element) => product.id === element.id)
								) {
									incProductQuantity(product.id);
								}
							}}
						>
							<ICONS.blackCart className={styles.icon} />
						</button>

						<Button
							withArrow
							arrowColor="white"
							className={styles.button}
							textClassName={styles.text}
						>
							ЗАМОВИТИ
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.mainData}>
				{product?.productDescription.map((element) => {
					return element.id === 0 ? (
						<div className={styles.firstBlock} key={element.id}>
							<div className={styles.aboutUsText}>
								<p className={styles.adoutUsTextHeader}>
									{element.title.toLocaleUpperCase()}
								</p>
								<p className={styles.adoutUsTextMain}>{element.description}</p>
							</div>
							<img src={element.img} className={styles.imageBlock1} />
						</div>
					) : (
						<p key={element.id} />
					);
				})}

				{product?.productDescription.map((element) => {
					return !(element.id === 0) ? (
						element.id % 2 === 0 ? (
							<div className={styles.secondAndThirdBlock} key={element.id}>
								<div className={styles.smallBlocksText}>
									<p className={styles.smallBlocksTextHeader}>
										{element.title.toLocaleUpperCase()}
									</p>
									<p className={styles.smallBlocksTextMain}>
										{element.description}
									</p>
								</div>
								<img src={element.img} className={styles.imageBlock2} />
							</div>
						) : (
							<div className={styles.secondAndThirdBlock} key={element.id}>
								<img src={element.img} className={styles.imageBlock2} />
								<div className={styles.smallBlocksText}>
									<p className={styles.smallBlocksTextHeader}>
										{element.title.toLocaleUpperCase()}
									</p>
									<p className={styles.smallBlocksTextMain}>
										{element.description}
									</p>
								</div>
							</div>
						)
					) : (
						<p key={element.id}></p>
					);
				})}
				{product?.ProductCharacteristic.map((element) => {
					if (product.category && product.category[0].name === "drone") {
						return (
							<div className={styles.characteristics} key={element.id}>
								<p className={styles.adoutUsTextHeader}>
									{element.title.toLocaleUpperCase()}
								</p>
								<p className={styles.adoutUsTextMain}>{element.description}</p>

								<div className={styles.characteristicsBlock}>
									<div className={styles.characteristicsSubBlock}>
										<p className={styles.subBlockText}>{element.coding}</p>
										<p className={styles.subBlockTitle}>Кодування</p>
									</div>
									<div className={styles.characteristicsSubBlock}>
										<p className={styles.subBlockText}>
											{element.ufsStorage} <p className={styles.gygabite}>GB</p>
										</p>
										<p className={styles.subBlockTitle}>UFS Сховище</p>
									</div>
									<div className={styles.characteristicsSubBlock}>
										<p className={styles.subBlockText}>
											{element.eMMSStorage}{" "}
											<p className={styles.gygabite}>GB</p>
										</p>
										<p className={styles.subBlockTitle}>eMMS</p>
									</div>
								</div>
								<img src={element.img} className={styles.imageBlock1} />
							</div>
						);
					}
					return (
						<div className={styles.characteristics} key={element.id}>
							<p className={styles.adoutUsTextHeader}>
								{element.title.toLocaleUpperCase()}
							</p>
							<p className={styles.adoutUsTextMain}>{element.description}</p>

							<div className={styles.characteristicsBlock}>
								<div className={styles.characteristicsSubBlock}>
									<p className={styles.subBlockText}>{element.coding}</p>
									<p className={styles.subBlockTitle}>
										Точний лазер із дальністю дії
									</p>
								</div>
								<div className={styles.characteristicsSubBlock}>
									<p className={styles.subBlockText}>
										{element.ufsStorage} <p className={styles.gygabite}></p>
									</p>
									<p className={styles.subBlockTitle}>Діапазон температур</p>
								</div>
								<div className={styles.characteristicsSubBlock}>
									<p className={styles.subBlockText}>
										{element.eMMSStorage} <p className={styles.gygabite}></p>
									</p>
									<p className={styles.subBlockTitle}>
										eMMC понад 8 годин роботи
									</p>
								</div>
							</div>
							<img src={element.img} className={styles.imageBlock1} />
						</div>
					);
				})}

				<div className={styles.catalog}>
					<p className={styles.topText}>СХОЖІ ТОВАРИ</p>

					<div className={styles.droneCardsBlock}>
						{products.map((element) => {
							return (
								<div
									className={styles.droneCardCatalog}
									key={`catalog${element.id}`}
								>
									<img src={element.img} className={styles.catalogImage} />
									<div className={styles.textBlock}>
										<p className={styles.droneTitle}>{element.title}</p>
										<div className={styles.price}>
											<p className={`${styles.withoutDiscount}`}>
												{element.price} $
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<Button
						className={styles.button}
						textClassName={styles.buttonText}
						withArrow
						arrowColor="white"
						navigateTo="/catalog/"
					>
						ДИВИТИСЬ ВСІ
					</Button>
				</div>
			</div>
		</div>
	);
}
