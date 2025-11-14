// components/ScanHistoryItem.tsx
import React from 'react';
import styles from './ScanHistoryItem.module.scss';

interface IScanHistoryItemProps {
    id: number;
    content: string;
    qrcodeImg?: string;
    createdAt: string;
    type: 'text';
}

export const ScanHistoryItem: React.FC<IScanHistoryItemProps> = ({
    content,
    createdAt,
    qrcodeImg,
}) => {
    return (
        <div className={styles.historyItemContainer}>
            <p >{content}</p>
            <p >
                {new Date(createdAt).toLocaleString()}
            </p>
            {qrcodeImg && (
                <img 
                    src={qrcodeImg}
                    alt="QR Code"
                />
            )}
        </div>
    );
};