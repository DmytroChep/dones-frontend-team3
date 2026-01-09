import { ReactNode } from "react"
import styles from "./main.module.css"

export function Main(props: {children: ReactNode}) {
    return (
        <main className={styles.main}>
            {props.children}
        </main>
    )
}