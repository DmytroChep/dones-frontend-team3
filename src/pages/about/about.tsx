import { Header } from "../../app/Header/"
import styles from "./about.module.css"
import { Footer } from "../../app/Footer"
import { IMAGES } from "../../shared"

export function About() {

    return (
        <div className={styles.about}>
            <div className={styles.firstBlock}>
                <div className={styles.aboutUsText}>
                    <p className={styles.adoutUsTextHeader}>ПРО НАС</p>
                    <p className={styles.adoutUsTextMain}>Ми — команда, яка об'єднана спільною метою: зробити передові технології 
                        доступними для кожного, хто потребує точності, безпеки та інновацій. З 2022 року ми спеціалізуємось на 
                        постачанні дронів і тепловізорів для професійного, цивільного та волонтерського використання.
                    </p>
                    <img src={IMAGES.aboutImage1} className={styles.imageBLock1}/>
                </div>
            </div>
            <div className={styles.secondAndThirdBlock}>
                <div></div>
            </div>
        </div>
    )
}