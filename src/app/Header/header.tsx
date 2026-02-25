import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ICONS, IMAGES } from "../../shared";
import styles from "./header.module.css";
import { Modal } from "../../shared/Modal";
import { Form } from "../../shared/Form";

export function Header(props: { className?: string; isWhiteBg: boolean }) {
    const { className, isWhiteBg } = props;
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [formType, setFormType] = useState<"auth" | "register">("auth");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [resetStep, setResetStep] = useState<number>(0);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            setIsModalOpen(true);
            setResetStep(2);
        }
    }, [searchParams]);

    const closeModal = () => {
        setIsModalOpen(false);
        setResetStep(0);
    };

    function handleInputFocus(event: React.MouseEvent) {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) setResetStep(0); 
        event.stopPropagation();
    }

    return (
        <header className={`${styles.header} ${className} ${isWhiteBg ? styles.whiteBg : styles.darkBg}`}>
            <div className={styles.headerBlock}>
                <button className={styles.burgerBtn} type="button">
                    <ICONS.burger className={styles.iconBurger} onClick={() => setIsOpen(!isOpen)} />
                </button>

                <div className={`${styles.leftBlock} ${isOpen ? styles.activeMenu : ""}`}>
                    <Link to="/catalog/" className={styles.link}>КАТАЛОГ</Link>
                    <Link to="/about/" className={styles.link}>ПРО НАС</Link>
                    <Link to="/contacts/" className={styles.link}>КОНТАКТИ</Link>
                </div>

                <img src={IMAGES.logo} className={styles.logo} alt="logo" onClick={() => navigate("/")} />

                <Modal className={styles.modal} isOpen={isModalOpen} onClose={closeModal} doCloseOnOutsideClick={true}>
                    <div className={styles.Form}>
                        <div className={styles.headerModal}>
                            {resetStep > 0 ? (
                                <p className={styles.blackText}>Відновлення пароля</p>
                            ) : (
                                <div className={styles.authAndRegister}>
                                    <p
                                        className={formType === "auth" ? styles.blackText : styles.greyText}
                                        onClick={() => setFormType("auth")}
                                    >
                                        Авторизація
                                    </p>
                                    <span>/</span>
                                    <p
                                        className={formType === "register" ? styles.blackText : styles.greyText}
                                        onClick={() => setFormType("register")}
                                    >
                                        Реєстрація
                                    </p>
                                </div>
                            )}
                            <ICONS.cross className={styles.cross} onClick={closeModal} />
                        </div>
                        
                        <Form 
                            variant={formType === "auth" ? "signIn" : "signUp"} 
                            resetStep={resetStep}
                            setResetStep={setResetStep}
                        />
                    </div>
                </Modal>

                <div className={styles.rightBlock}>
                    <ICONS.cart className={styles.miniLogo} onClick={() => {}} />
                    <ICONS.user className={styles.miniLogo} onClick={token ? () => navigate("/profile/") : handleInputFocus} />
                </div>
            </div>
        </header>
    );
}