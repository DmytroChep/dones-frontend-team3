import type { IModalProps } from "./modal.types"
import styles from "./modal.module.css"
import { FunctionComponent, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ICONS } from "../icons"


export function Modal(props: IModalProps) {
    const { children, className, isOpen, onClose, doCloseOnOutsideClick, portalElem=document.body } = props

    const modalRef = useRef<HTMLDivElement>(null)
    


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

    if (!isOpen) {
        return null
    }

    return createPortal(
        <div className={`${className} ${styles.modal}`} ref={modalRef}>
            {children}
        </div>,
        portalElem
    )
}