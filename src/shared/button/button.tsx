import { useNavigate } from "react-router-dom";
import { ICONS } from "../icons";
import styles from "./button.module.css";
import type { IButtonProps } from "./button-types";

export function Button(props: IButtonProps) {
	const {
		className,
		children,
		withArrow,
		arrowColor,
		textClassName,
		arrowClassName,
		navigateTo,
		type = "button",
		onClick,
	} = props;
	const navigate = useNavigate();
	return (
		<button
			type={type}
			className={`${styles.button} ${className}`}
			onClick={(e) => {
				if (onClick) {
					onClick(e);
				}
				if (navigateTo) {
					navigate(navigateTo);
				}
			}}
		>
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
		</button>
	);
}
