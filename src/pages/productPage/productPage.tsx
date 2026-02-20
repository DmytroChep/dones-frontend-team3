import { ThreeDot } from "react-loading-indicators";
import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/use-post-by-id";
import { useProductsSugg } from "../../hooks/use-suggestions";
import { ICONS, IMAGES } from "../../shared";
import { Button } from "../../shared/button";
import styles from "./productPage.module.css";
import { useEffect } from "react";

export function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const productId = Number(id);
	const { product, isLoaded } = useProductById(productId);

	const { products } = useProductsSugg({
		take: 4,
		sameAs: { limit: 4, name: product?.title },
	});

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])

	return (
		<div className={styles.productPage}>
			<div className={styles.topBlock}>
				{isLoaded ? (
					<div className={styles.titleAndDescBlock}>
						<p className={styles.title}>{product?.title}</p>
						<p className={styles.description}>{product?.description}</p>
					</div>
				) : (
					<ThreeDot color="#6f6f6f" size="medium" text="" textColor="" />
				)}
				<img src={IMAGES.correctRotationDrone2} className={styles.droneImage} />
				<div className={styles.ovalShell}>
					<div className={styles.oval}></div>
				</div>
				<div className={styles.buyBlock}>
					<div className={styles.droneInfoSmall}>
						<img
							src={IMAGES.correctRotationDrone2}
							className={styles.droneImageSmall}
						/>
						<div className={styles.priceAndTitle}>
							<p className={styles.smallTitle}>{product?.title}</p>
							<p className={styles.smallPrice}>{product?.price} ₴ </p>
						</div>
					</div>
					<div className={styles.buttonsBlock}>
						<button className={styles.buttonCart} type="button">
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
				{product?.productDescription.map((product) => {
					return product.id === 0 ? (
						<div className={styles.firstBlock} key={product.id}>
							<div className={styles.aboutUsText}>
								<p className={styles.adoutUsTextHeader}>
									{product.title.toLocaleUpperCase()}
								</p>
								<p className={styles.adoutUsTextMain}>{product.description}</p>
							</div>
							<img src={IMAGES.aboutImage1} className={styles.imageBlock1} />
						</div>
					) : (
						<p key={product.id}/>
					);
				})}

				{product?.productDescription.map((element) => {
					return element.id % 2 === 0 ? (
						<div className={styles.secondAndThirdBlock} key={element.id}>
							<div className={styles.smallBlocksText}>
								<p className={styles.smallBlocksTextHeader}>{element.title}</p>
								<p className={styles.smallBlocksTextMain}>
									{element.description}
								</p>
							</div>
							<img src={IMAGES.aboutImage2} className={styles.imageBlock2} />
						</div>
					) : (
						<div className={styles.secondAndThirdBlock} key={element.id}>
							<img src={IMAGES.aboutImage2} className={styles.imageBlock2} />
							<div className={styles.smallBlocksText}>
								<p className={styles.smallBlocksTextHeader}>{element.title}</p>
								<p className={styles.smallBlocksTextMain}>
									{element.description}
								</p>
							</div>
						</div>
					);
				})}
				{product?.ProductCharacteristic.map((product) => {
					return (
						<div className={styles.characteristics} key={product.id}>
							<p className={styles.adoutUsTextHeader}>{product.title}</p>
							<p className={styles.adoutUsTextMain}>{product.description}</p>

							<div className={styles.characteristicsBlock}>
								<div className={styles.characteristicsSubBlock}>
									<p className={styles.subBlockText}>{product.coding}</p>
									<p className={styles.subBlockTitle}>Кодування</p>
								</div>
								<div className={styles.characteristicsSubBlock}>
									<p className={styles.subBlockText}>
										{product.ufsStorage} <p className={styles.gygabite}>GB</p>
									</p>
									<p className={styles.subBlockTitle}>UFS Сховище</p>
								</div>
								<div className={styles.characteristicsSubBlock}>
									<p className={styles.subBlockText}>
										{product.eMMSStorage} <p className={styles.gygabite}>GB</p>
									</p>
									<p className={styles.subBlockTitle}>eMMS</p>
								</div>
							</div>
							<img src={IMAGES.drone} className={styles.imageBlock1} />
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
									<img
										src={IMAGES.catalogExampleDrone}
										className={styles.catalogImage}
									/>
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
