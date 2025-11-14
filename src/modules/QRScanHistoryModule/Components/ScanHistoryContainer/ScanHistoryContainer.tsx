import React from 'react'
import styles from './ScanHistoryContainer.module.scss'

export const ScanHistoryContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}


