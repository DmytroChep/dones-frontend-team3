import { ICONS } from "../icons"
import { IMAGES } from "../images"
import { IButtonProps } from "./button-types"
import styles from "./button.module.css"

export function Button(props: IButtonProps){

    const {className, children, withArrow, arrowColor, textClassName, arrowClassName} = props

    return (
        <div className={`${styles.button} ${className}`}>
            <p className={`${styles.text} ${textClassName}`}>{children}</p>
            { withArrow ? arrowColor === "white" ? (<ICONS.arrowRightWhite className={arrowClassName} />) : (<ICONS.rightArrow className={arrowClassName} />) : false }
        </div>
    )
}