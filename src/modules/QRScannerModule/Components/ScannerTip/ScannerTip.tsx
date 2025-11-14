import React from 'react'
import styles from "./ScannerTip.module.scss"

export const ScannerTip: React.FC = () => {
    return (
        <div className={styles.tipWrapper}>
            <p>
                💡 
                <strong>Tip: </strong>
                Position the QR code in the center of the frame for better recognition
            </p>
        </div>
    )
}

