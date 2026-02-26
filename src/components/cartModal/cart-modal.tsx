import type { ICartModalProps } from "./cart-modal.types"
import styles from "./cart-modal.module.css"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export function CartModal(props: ICartModalProps) {
    const { children, className, isOpen, onClose, doCloseOnOutsideClick, portalElem } = props
    const modalRef = useRef<HTMLDivElement>(null)

    console.log(portalElem)

    useEffect(() => {
        if (!isOpen || !doCloseOnOutsideClick) return; 

        function clickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (modalRef.current && !modalRef.current.contains(target)) {
                onClose();
            }
        }

        const timeoutId = setTimeout(() => {
            document.addEventListener("click", clickOutside);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", clickOutside);
        };
    }, [isOpen, doCloseOnOutsideClick, onClose]);

    if (!isOpen) return null;

    const portal = portalElem.current || document.body;

    return createPortal(
        <div className={`${className} ${styles.modal}`} ref={modalRef} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>,
        portal
    )
}