import React from 'react'
import styles from './ScannerContainer.module.scss'
export const ScannerContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}


