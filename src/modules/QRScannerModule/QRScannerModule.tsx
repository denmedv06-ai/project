import React from 'react';
import { ScannerContainer } from './Components/ScannerContainer/ScannerContainer';
import { ScannerStatus } from './Components/ScannerStatus/ScannerStatus';
import { ScannerDisplay} from './Components/ScannerDisplay/ScannerDisplay';
import {ScannerControls} from './Components/ScannerControls/ScannerControls';
import { ScannerTip } from './Components/ScannerTip/ScannerTip';


export const QRScannerView: React.FC = () => {

    return (
        <ScannerContainer>
            <ScannerStatus/>
            <ScannerDisplay/>
            <ScannerControls/>
            <ScannerTip/>
        </ScannerContainer>
    );
};
