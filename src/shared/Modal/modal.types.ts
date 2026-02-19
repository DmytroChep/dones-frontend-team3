import { ReactNode } from "react";

export interface IModalProps{
    children: ReactNode
    className: string
    isOpen: boolean
    onClose: () => void
    doCloseOnOutsideClick: boolean
    portalElem?: HTMLElement
}  