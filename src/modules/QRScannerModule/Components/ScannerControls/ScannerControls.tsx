import React from 'react'
import { useQRScanner } from '../../Context/QRScannerContext'
import { useQRScannerViewmodel } from '../../../../ViewModels/QRScannerViewmodel';
import styles from './ScannerControls.module.scss'

export const ScannerControls: React.FC = () => {
    const { startScan, stopScan } = useQRScanner();
    const { scanning, lastScan, error } = useQRScannerViewmodel();

    return (
        <div className={styles.container}>
            {!scanning && <button className={styles.button} onClick={startScan}>Start Scanner</button>}
            {scanning && <button className={styles.button} onClick={stopScan}>Stop Scanner</button>}
        </div>
    )
}
