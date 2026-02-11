import { ICONS } from "../icons";
import { IMAGES } from "../images";
import styles from "./button.module.css";
import type { IButtonProps } from "./button-types";
import { useNavigate } from "react-router-dom";

export function Button(props: IButtonProps) {
	const {
		className,
		children,
		withArrow,
		arrowColor,
		textClassName,
		arrowClassName,
		navigateTo
	} = props;
	const navigate = useNavigate()
	return (
		<div className={`${styles.button} ${className}`} onClick={() => {
							if (navigateTo){
								navigate(navigateTo)
							}
						}}>
			<p className={`${styles.text} ${textClassName}`}>{children}</p>
			{withArrow ? (
				arrowColor === "white" ? (
					<ICONS.arrowRightWhite className={arrowClassName} />
				) : (
					<ICONS.rightArrow className={arrowClassName} />
				)
			) : (
				false
			)}
		</div>
	);
}
