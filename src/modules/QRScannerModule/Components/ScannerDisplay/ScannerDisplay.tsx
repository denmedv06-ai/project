import React from 'react'
import { useQRScannerViewmodel } from '../../../../ViewModels/QRScannerViewmodel';
import styles from './ScannerDisplay.module.scss'

export const ScannerDisplay: React.FC = () => {
    const { scanning } = useQRScannerViewmodel();
    return (
        <>
            <div className={styles.displayWrapper}>
                <div id="qr-reader" className={styles.scannerContainer} />
                {!scanning &&
                    <div className={styles.inactiveContainer}>
                        <p>Camera is not active</p>
                        <p>Press the button below to start</p>
                    </div>}
            </div>

        </>
    )
}