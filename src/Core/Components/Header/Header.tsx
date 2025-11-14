import React from 'react'
import styles from "./Header.module.scss"


export const Header: React.FC = () => {
    return (
        <header className={styles.headerWrapper}>
            <div className={styles.logoWrapper}>
                <span>
                    QR Scanner
                </span>
            </div>
        </header>
    )
}
