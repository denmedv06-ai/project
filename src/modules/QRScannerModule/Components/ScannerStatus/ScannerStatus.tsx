import React from 'react'
import { useQRScannerViewmodel } from '../../../../ViewModels/QRScannerViewmodel'
import styles from './ScannerStatus.module.scss'

export const ScannerStatus: React.FC = () => {
    const {scanning} = useQRScannerViewmodel();

    return (
        <div className={styles.container}>
            <div>
                Scanner Camera
            </div>
            <div className={styles.rightContainer}>
                {scanning ? 'Active' : 'Inactive'}
            </div>
        </div>
    )
}


