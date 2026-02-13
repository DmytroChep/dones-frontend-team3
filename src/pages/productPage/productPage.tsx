import { ThreeDot } from "react-loading-indicators"
import { useProductById } from "../../hooks/use-post-by-id"
import { useParams } from "react-router-dom";
import styles from "./productPage.module.css"
import { ICONS, IMAGES } from "../../shared";
import { Button } from "../../shared/button";

export function ProductPage(){
	const { id } = useParams<{ id: string }>(); 
  	const productId = Number(id);
	const {product, isLoaded} = useProductById(productId)

	return (
		<div className={styles.productPage}>
			<div className={styles.topBlock}>
				{isLoaded ? (
					<div className={styles.titleAndDescBlock}>
						<p className={styles.title}>{product?.title}</p>
						<p className={styles.description}>{product?.description}</p>
					</div>
				) : <ThreeDot color="#6f6f6f" size="medium" text="" textColor="" />}
				<img src={IMAGES.correctRotationDrone2} className={styles.droneImage}/>
				<div className={styles.ovalShell}>
					<div className={styles.oval}></div>
				</div>
				<div className={styles.buyBlock}>
					<div className={styles.droneInfoSmall}>
						<img src={IMAGES.correctRotationDrone2} className={styles.droneImageSmall}/>
						<div className={styles.priceAndTitle}>
							<p className={styles.smallTitle}>{product?.title}</p>
							<p className={styles.smallPrice}>{product?.price}</p>
						</div>	
					</div>
					<div className={styles.buttonsBlock}>
						<button className={styles.buttonCart}>
							 <ICONS.blackCart  className={styles.icon} />
						</button>

						<Button  withArrow arrowColor="white" className={styles.button} textClassName={styles.text}>ЗАМОВИТИ</Button>
					</div>
				</div>
			</div>
			<div className={styles.mainData}>
				
			</div>
		</div>
		
	)
}