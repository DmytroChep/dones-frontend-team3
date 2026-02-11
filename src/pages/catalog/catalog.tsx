import { useEffect, useState } from "react";
import { useProductsSugg } from "../../hooks/use-suggestions"
import { ICONS, IMAGES } from "../../shared";
import styles from "./catalog.module.css"

export function CatalogPage() {
	const {Products} = useProductsSugg({typeOfSuggestion: "new"})
	const [choosedFilter, setChoosedFilter] = useState<string>("all")



	return (
		<div className={styles.catalog} >
			<p className={styles.catalogTitle}>КАТАЛОГ</p>
			<div className={styles.catalogDiv}>
				<div className={styles.filters}>
					<button className={choosedFilter === "all" ? `${styles.choosedFilter}` : `${styles.filter}` } name="all" onClick={(event) => {
						setChoosedFilter(event.currentTarget.name)
					}}>
						Всі
					</button>
					
					<button className= {choosedFilter === "drone" ? `${styles.choosedFilter}` : `${styles.filter}` } name="drone" onClick={(event) => {
						setChoosedFilter(event.currentTarget.name)
					}}>
						<img src={IMAGES.correctRotateDrone} className={styles.droneFilter} alt="" />
					</button>

					<button className={choosedFilter === "monocular" ? `${styles.choosedFilter}` : `${styles.filter}` } name="monocular" onClick={(event) => {
						setChoosedFilter(event.currentTarget.name)
					}}>
						<img src={IMAGES.monocular} className={styles.lenseFilter} alt="" />
					</button>

				</div>
				<div className={styles.products}>
					{Products.map((element) => {
						return (
								<div
									className={`${styles.droneCardCatalog} 
										${element.category.map(category => category.name).join(' ')}
										${element.category.some(category => choosedFilter === category.name) || choosedFilter=== "all" ? true : styles.hidden}
										`}

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
			</div>
		</div>
	)

}
