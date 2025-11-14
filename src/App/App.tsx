import React from 'react';
import { QRScannerView } from '../modules/QRScannerModule/QRScannerModule';
import { QRScannerProvider } from '../modules/QRScannerModule/Context/QRScannerContext';
import { Header } from '../Core/Components/Header/Header';
import QRScanHistoryModule from '../modules/QRScanHistoryModule/QRScanHistoryModule';

export const App: React.FC = () => {
    return (
        <>
            <Header />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <QRScannerProvider>
                    <QRScannerView />
                </QRScannerProvider>
                <QRScanHistoryModule />
            </div>
        </>

    );
};
