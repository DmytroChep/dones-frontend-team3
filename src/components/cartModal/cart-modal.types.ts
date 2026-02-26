import type { ReactNode } from "react";

export interface ICartModalProps{
    children: ReactNode
    className: string
    isOpen: boolean
    onClose: () => void
    doCloseOnOutsideClick: boolean
    portalElem: React.RefObject<HTMLDivElement | null>;
}  