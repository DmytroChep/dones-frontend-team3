import { useNavigate } from "react-router-dom";
import type { IProduct } from "../../assets/types";
import { useProductsSugg } from "../../hooks/use-suggestions";
import { IMAGES } from "../../shared";
import { Button } from "../../shared/button";
import styles from "./home.module.css";
import { useEffect } from "react";

export function HomePage() {
	const { products: popularProducts, isLoaded: isPopularLoaded } =
		useProductsSugg({ take: 4, typeOfSuggestion: "new" });
	const { products: newProducts, isLoaded: isNewLoaded } = useProductsSugg({
		take: 3,
		typeOfSuggestion: "popular",
	});

	const _navigate = useNavigate();

	console.log([newProducts, popularProducts]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])

	return (
		<div className={styles.home}>
			<div className={styles.topBlock}>
				<p className={styles.pageTitle}>ТЕХНОЛОГІЇ</p>
				<p className={styles.pageTitle}>ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ </p>
				<img src={IMAGES.drone} className={styles.drone} />
				<div className={styles.footer}>
					<div className={styles.footerBlock}>
						<p className={styles.footerText}>
							Передові технології в одному місці. <br />
							Обирай найкраще для найважливішого.
						</p>
						<Button className={styles.button} textClassName={styles.buttonText}>
							ДО КАТАЛОГУ
						</Button>
					</div>
				</div>
				<div className={styles.oval}></div>
			</div>
			<div className={styles.otherBlock}>
				<div className={styles.about}>
					<p className={styles.topText}>ПРО НАС</p>
					<p className={styles.middleText}>
						Ми — команда, що об'єднує технології та надійність. <br />{" "}
						Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах.{" "}
						<br /> Обираємо тільки те, чому довіряємо самі.
					</p>
					{/* <button className={styles.readMore}>
                        <p className={styles.readMoreText}>ЧИТАТИ БІЛЬШЕ</p>
                        <ICONS.rightArrow />
                    </button> */}
					<Button
						withArrow
						arrowColor="black"
						textClassName={styles.readMoreText}
						className={styles.readMore}
					>
						ЧИТАТИ БІЛЬШЕ
					</Button>
				</div>
				<div className={styles.new}>
					<p className={styles.topText}>НОВЕ НА САЙТІ</p>
					<div className={styles.drones}>
						{newProducts.map((product: IProduct) => {
							return (
								<div className={styles.droneCard} key={product.id}>
									<img
										src={IMAGES.correctRotateDrone}
										className={styles.droneImage}
									/>
									<div
										className={`${styles.bottomDiv} ${styles[product.color]}`}
									>
										<div className={styles.text}>
											<p className={styles.mainTitle}>{product.title}</p>
											<p className={styles.subTitle}>{product.description}</p>
										</div>
										<div className={styles.bottomBlock}>
											<p className={styles.fromText}>
												from to ${product.price}
											</p>

											<Button
												className={styles.readMoreWhite}
												textClassName={styles.readMoreTextWhite}
												arrowClassName={styles.whiteArrow}
												arrowColor="white"
												withArrow
												navigateTo={`/product/${product.id}`}
											>
												КУПИТИ
											</Button>
										</div>
									</div>
								</div>
							);
						})}

						{/* <div className={styles.droneCard}>
                            <img src={IMAGES.correctRotateDrone} className={styles.droneImage}/>
                            <div className={`${styles.bottomDiv} ${styles.yellow}`}>
                                <div className={styles.text}>
                                    <p className={styles.mainTitle}>DJI Mini 4K</p>
                                    <p className={styles.subTitle}>Easy-To-Use Mini Camera Drone</p>
                                </div>
                                <div className={styles.bottomBlock}>
                                    <p className={styles.fromText}>
                                        from to $299
                                    </p>

                                    <Button className={styles.readMoreWhite} 
                                    textClassName={styles.readMoreTextWhite}
                                    arrowClassName={styles.whiteArrow}
                                    arrowColor="white"
                                    withArrow
                                    >КУПИТИ</Button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.droneCard}>
                            <img src={IMAGES.correctRotateDrone} className={styles.droneImage}/>
                            <div className={`${styles.bottomDiv} ${styles.black}`}>
                                <div className={styles.text}>
                                    <p className={styles.mainTitle}>DJI Mini 4K</p>
                                    <p className={styles.subTitle}>Easy-To-Use Mini Camera Drone</p>
                                </div>
                                <div className={styles.bottomBlock}>
                                    <p className={styles.fromText}>
                                        from to $299
                                    </p>

                                    <Button className={styles.readMoreWhite} 
                                    textClassName={styles.readMoreTextWhite}
                                    arrowClassName={styles.whiteArrow}
                                    arrowColor="white"
                                    withArrow
                                    >КУПИТИ</Button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.droneCard}>
                            <img src={IMAGES.correctRotateDrone} className={styles.droneImage}/>
                            <div className={`${styles.bottomDiv} ${styles.blue}`}>
                                <div className={styles.text}>
                                    <p className={styles.mainTitle}>DJI Mini 4K</p>
                                    <p className={styles.subTitle}>Easy-To-Use Mini Camera Drone</p>
                                </div>
                                <div className={styles.bottomBlock}>
                                    <p className={styles.fromText}>
                                        from to $299
                                    </p>

                                    <Button className={styles.readMoreWhite} 
                                    textClassName={styles.readMoreTextWhite}
                                    arrowClassName={styles.whiteArrow}
                                    arrowColor="white"
                                    withArrow
                                    >КУПИТИ</Button>
                                </div>
                            </div>
                        </div> */}
					</div>
				</div>

				<div className={styles.catalog}>
					<p className={styles.topText}>КАТАЛОГ</p>

					<div className={styles.droneCardsBlock}>
						{popularProducts.map((element) => {
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
						{/* <div className={styles.droneCardCatalog}>
							<img src={IMAGES.catalogExampleDrone} className={styles.catalogImage}/>
							<div className={styles.textBlock}>
								<p className={styles.droneTitle}>DJI Mini 4K</p>
								<div className={styles.price}>
									<p className={styles.priceText}>29 900 $</p>
									<p className={styles.discount}>30 000 $</p>
								</div>
							</div>
						</div>

						<div className={styles.droneCardCatalog}>
							<img src={IMAGES.catalogExampleDrone} className={styles.catalogImage}/>
							<div className={styles.textBlock}>
								<p className={styles.droneTitle}>DJI Mini 4K</p>
								<div className={styles.price}>
									<p className={`${styles.withoutDiscount}`}>29 900 $</p> 
								</div>
							</div>
						</div>

						<div className={styles.droneCardCatalog}>
							<img src={IMAGES.catalogExampleDrone} className={styles.catalogImage}/>
							<div className={styles.textBlock}>
								<p className={styles.droneTitle}>DJI Mini 4K</p>
								<div className={styles.price}>
									<p className={`${styles.withoutDiscount}`}>29 900 $</p>
								</div>
							</div>
						</div>

						<div className={styles.droneCardCatalog}>
							<img src={IMAGES.catalogExampleDrone} className={styles.catalogImage}/>
							<div className={styles.textBlock}>
								<p className={styles.droneTitle}>DJI Mini 4K</p>
								<div className={styles.price}>
									<p className={`${styles.withoutDiscount}`}>29 900 $</p>
								</div>
							</div>
						</div> */}
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
