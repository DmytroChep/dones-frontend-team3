import { useEffect } from "react";
import { ICONS } from "../../shared"
import styles from "./contacts.module.css"

export function Contact(){

    useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [])
    
    return (
        <div className={styles.main}>
            <p className={styles.title}>КОНТАКТИ</p>

            <div className={styles.data}>
                <div className={styles.ourContacts}>
                    <p className={styles.titleOurContacts}>Наші контакти</p>
                    <div className={styles.contactInfo}>
                        <p className={styles.contactField}><ICONS.phone className={styles.icon} /> +38 (067) 123-45-67</p>
                        <p className={styles.contactField}><ICONS.mail className={styles.icon} /> info@dronex.com.ua</p>
                        <p className={styles.contactField}><ICONS.pin className={styles.icon} /> вул. Університетська, 22, м. Дніпро, 49000, Україна</p>
                        <p className={styles.contactField}><ICONS.calendar className={styles.icon} /> Пн–Пт: 10:00 — 18:00, Сб–Нд: вихідні</p>
                    </div>
                    <div className={styles.weInSocNets}>
                        <p>Ми в соцмережах</p>
                        <div className={styles.socIcons}>
                            <ICONS.facebook />
                            <ICONS.telegram />
                            <ICONS.instagram />
                        </div>
                    </div>
                </div>
                <div className={styles.contactsWithUs}>
                    <p className={styles.titleOurContacts}>Зв'язатися з нами</p>
                    <div className={styles.inputs}>
                        <div className={styles.field}>
                            <p className={styles.fieldTitle}>Ім'я</p>
                            <div className={styles.input}>
                                <input
                                    placeholder="Введіть ім'я"
                                    className={`${styles.fieldInput}`}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.fieldTitle}>Телефон</p>
                            <div className={styles.input}>
                                <input
                                    placeholder="+38 0"
                                    className={`${styles.fieldInput}`}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.fieldTitle}>E-mail</p>
                            <div className={styles.input}>
                                <input
                                    placeholder="Ваш E-mail"
                                    className={`${styles.fieldInput}`}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <p className={styles.fieldTitle}>Повідомлення</p>
                            <div className={styles.input}>
                                <textarea
                                    placeholder="ваше повідомлення"
                                    className={`${styles.fieldInput} ${styles.textArea}`}
                                />
                            </div>
                        </div>
                    </div>
                    <button className={styles.send} type="submit">НАДІСЛАТИ</ button>
                </div>
            </div>
        </div>
    )
}