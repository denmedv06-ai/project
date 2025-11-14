import React from 'react'
import { ScanHistoryContainer } from './Components/ScanHistoryContainer/ScanHistoryContainer'
import { ScanHistoryHeader } from './Components/ScanHistoryHeader/ScanHistoryHeader'
import { ScanHistoryList } from './Components/ScanHistoryList/ScanHistoryList'

export const QRScanHistoryModule: React.FC = () => {
    return (
        <ScanHistoryContainer>
            <ScanHistoryHeader/>
            <ScanHistoryList/>
        </ScanHistoryContainer>
    )
}

export default QRScanHistoryModule
