import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQRScannerViewmodel } from '../../../ViewModels/QRScannerViewmodel';

interface IQRScannerContextType {
    startScan: () => void;
    stopScan: () => void;
}

const QRScannerContext = createContext<IQRScannerContextType | undefined>(undefined);

export const useQRScanner = () => {
    const context = useContext(QRScannerContext);
    if (!context) {
        throw new Error('useQRScanner must be used within a QRScannerProvider');
    }
    return context;
};

export const QRScannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const startScan = useQRScannerViewmodel(state => state.startScan);
    const stopScan = useQRScannerViewmodel(state => state.stopScan);

    useEffect(() => {
        return () => {
            void stopScan();
        };
    }, [stopScan]);

    return (
        <QRScannerContext.Provider value={{ startScan, stopScan }}>
            {children}
        </QRScannerContext.Provider>
    );
}

export default QRScannerContext