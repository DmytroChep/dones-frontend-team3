
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string; 
	children: string;
	withArrow?: boolean;
	arrowClassName?: string;
	textClassName?: string;
	arrowColor?: "white" | "black";
	navigateTo?: string;
}
